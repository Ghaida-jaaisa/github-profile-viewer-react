import { useEffect, useState } from "react";
import RepoCard from "./RepoCard";

export default function UserRepos({ username, public_repos }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [reposCache, setReposCache] = useState({});
  const [currentRepos, setCurrentRepos] = useState([]); // to deal with current repos (dynamic, or by searhing)
  const [repoName, setRepoName] = useState("");
  const [searchMode, setSearchMode] = useState(false);
  const repo_per_page = 4;
  const number_of_pages = Math.max(
    1,
    Math.ceil((public_repos || 0) / repo_per_page)
  );

  // useEffect(() => {
  //   const cachedRepos = localStorage.getItem("reposCache");
  //   if (cachedRepos) {
  //     setReposCache(JSON.parse(cachedRepos));
  //   }
  // }, []);

  // Handle search mode state
  useEffect(() => {
    if (!repoName) {
      setSearchMode(false);
    }
  }, [repoName]);

  // Reset data when username changes
  useEffect(() => {
    if (username) {
      setCurrentRepos([]);
      setReposCache({});
      setPage(1);
    }
  }, [username]);

  useEffect(() => {
    if (!page || !username || searchMode) {
      return;
    }
    fetchGithubRepos(page);
  }, [page, username, searchMode]);

  async function fetchRepoByName(repoName) {
    if (!repoName) {
      return;
    }

    const search_url = `https://api.github.com/search/repositories?q=${repoName}+user:${username}+in:name&per_page=${repo_per_page}&page=1`;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(search_url);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Repo not found");
        }
        throw new Error("Something went wrong, try again later");
      }

      const data = await response.json();
      setCurrentRepos(data.items);
    } catch (err) {
      setError(err.message);
      // setRepoName("");
    } finally {
      setLoading(false);
    }
  }

  function handleSearch() {
    setSearchMode(true);
    fetchRepoByName(repoName);
  }

  async function fetchGithubRepos(page) {
    if (!username) {
      return;
    }
    const repo_url = `https://api.github.com/users/${username}/repos?per_page=${repo_per_page}&page=${page}`;
    
    // Check if page data is in cache
    if (reposCache[page]) {
      setCurrentRepos(reposCache[page]);
      return;
    }
    setLoading(true);
    setError(null);
    // send new request
    try {
      const result = await fetch(repo_url);
      if (!result.ok) {
        throw new Error(`HTTP Error: ${result.status}`);
      }
      const data = await result.json();
      const newCache = { ...reposCache, [page]: data }; // add cuurent req to cached fetched repos
      setReposCache(newCache);
      setCurrentRepos(data);
      // localStorage.setItem("reposCache", JSON.stringify(newCache));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!username) return <p>Please provide a username.</p>;

  if (loading) return <p>Loading repos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="user-repos">
      {!searchMode && (
        <img
          src="/assets/images/arrow-left.svg"
          alt="arrow-left"
          className="arrow left-arrow"
          // ref={leftArrowRef}
          onClick={() => setPage((p) => (p === 1 ? number_of_pages : p - 1))}
        />
      )}
      <h2 className={searchMode ? "h2-span3" : "h2-span2"}>
        Public Repos: {public_repos}
      </h2>
      <div className={searchMode ? "search-box-span-3" : "search-box-span-2"}>
        <button
          disabled={searchMode || loading}
          className="btn-search"
          onClick={handleSearch}
        >
          <img
            src="/magnifying-glass-solid-full.svg"
            alt="magnifying-glass-solid-full"
          />
        </button>
        <input
          type="text"
          className="input-search"
          placeholder="Search..."
          maxLength={30}
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
        />
      </div>

      {!searchMode && (
        <img
          src="/assets/images/arrow-right.svg"
          alt="arrow-right"
          className="arrow right-arrow"
          onClick={() => setPage((p) => (p < number_of_pages ? p + 1 : 1))}
        />
      )}
      {currentRepos.map((repo) => (
        <RepoCard
          key={repo.name}
          name={repo.name}
          description={repo.description}
          stargazers_count={repo.stargazers_count}
          svn_url={repo.svn_url}
        />
      ))}
    </div>
  );
}
