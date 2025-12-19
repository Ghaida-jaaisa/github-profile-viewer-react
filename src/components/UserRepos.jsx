import { useEffect, useState } from "react";
import RepoCard from "./RepoCard";

export default function UserRepos({ username, public_repos }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [reposCache, setReposCache] = useState({});
  const [currentRepos, setCurrentRepos] = useState([]);
  const repo_per_page = 2;
  const number_of_pages = Math.ceil(public_repos / repo_per_page);

  useEffect(() => {
    const cachedRepos = localStorage.getItem("reposCache");
    if (cachedRepos) {
      setReposCache(JSON.parse(cachedRepos));
    }
  }, []);

  const repo_url = `https://api.github.com/users/${username}/repos?per_page=${repo_per_page}&page=${page}`;

  async function fetchGithubRepos(page) {
    // if (page >= number_of_pages) {
    //   setPage(1); // circular
    // }
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
      localStorage.setItem("reposCache", JSON.stringify(newCache));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (username) {
      fetchGithubRepos(page);
    }
  }, [page, username]);

  if (!username) return <p>Please provide a username.</p>;

  if (loading) return <p>Loading repos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="user-repos">
      <img
        src="/assets/images/arrow-left.svg"
        alt="arrow-left"
        className="arrow left-arrow"
        disable={page == 1}
        onClick={() => setPage((p) => p - 1)}
      />
      <h2>Repos</h2>
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
