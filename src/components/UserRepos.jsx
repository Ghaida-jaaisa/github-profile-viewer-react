import { useEffect, useState } from "react";
import RepoCard from "./RepoCard";

export default function UserRepos({ username, public_repos }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [reposCache, setReposCache] = useState({});
  const [currentRepos, setCurrentRepos] = useState([]);
  const [repoName, setRepoName] = useState("");
  const [allRepos, setAllRepos] = useState([]);

  const repo_per_page = 4;
  const number_of_pages = Math.ceil(public_repos / repo_per_page);

  // useEffect(() => {
  //   const cachedRepos = localStorage.getItem("reposCache");
  //   if (cachedRepos) {
  //     setReposCache(JSON.parse(cachedRepos));
  //   }
  // }, []);

  // to support circular display
  useEffect(() => {
    if (page > number_of_pages) setPage(1);
  }, [page]);

  async function fetchGithubRepos(page) {
    const repo_url = `https://api.github.com/users/${username}/repos?per_page=${repo_per_page}&page=${page}`;
    if (reposCache[page]) {
      setCurrentRepos(reposCache[page]);
      return;
    }

    try {
      const result = await fetch(repo_url);
      if (!result.ok) {
        throw new Error(`HTTP Error: ${result.status}`);
      }
      const data = await result.json();
      const newCache = { ...reposCache, [page]: data };
      setReposCache(newCache);
      setCurrentRepos(data);
      setAllRepos(data);
      // localStorage.setItem("reposCache", JSON.stringify(newCache));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (username) {
      // reset
      setCurrentRepos([]);
      setReposCache({});
      fetchGithubRepos(page);
    }
  }, [username]);

  useEffect(() => {
    fetchGithubRepos(page);
  }, [page]);

  function fetchRepoByName(repoName) {
    if (!repoName) {
      setCurrentRepos(allRepos);
      return;
    }

    const filtered = allRepos.filter((repo) =>
      repo.name.toLowerCase().includes(repoName.toLowerCase())
    );
    setCurrentRepos(filtered);
  }

  if (!username) return <p>Please provide a username.</p>;

  if (loading) return <p>Loading repos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="user-repos">
      <img
        src="/assets/images/arrow-left.svg"
        alt="arrow-left"
        className="arrow left-arrow"
        onClick={() => page > 1 && setPage((p) => p - 1)}
      />
      <h2>Public Repos: {public_repos}</h2>
      <div className="search-repo-input">
        <input
          type="text"
          placeholder="Search by repo name"
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
        />
        <button type="submit" onClick={() => fetchRepoByName(repoName)}>
          →
        </button>
      </div>
      <img
        src="/assets/images/arrow-right.svg"
        alt="arrow-right"
        className="arrow right-arrow"
        onClick={() => setPage((p) => p + 1)}
      />
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
