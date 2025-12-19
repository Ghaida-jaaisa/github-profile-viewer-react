import { useEffect, useState } from "react";
import RepoCard from "./RepoCard";

export default function UserRepos({ username }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const repo_url = `https://api.github.com/users/${username}/repos`;
  const reposCount = repos.length;
  // const reposIds = repos.map((repo) => repo.id);
  useEffect(() => {
    fetchGithubRepos();
  }, [username]);

  async function fetchGithubRepos() {
    try {
      const result = await fetch(repo_url);
      if (!result.ok) {
        throw new Error(`HTTP Error: ${result.status}`);
      }
      const data = await result.json();
      setRepos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (username) {
    if (loading) return <p>Loading repos...</p>;
    if (error) return <p>Error: {error}</p>;
  }
  return (
    username && (
      <div className="user-repos">
        <img
          src="/assets/images/arrow-left.svg"
          alt="arrow-left"
          className="arrow left-arrow"
        />

        <h2>
          <b>Public Repos : {repos.length}</b>
        </h2>

        <img
          src="/assets/images/arrow-right.svg"
          alt="arrow-right"
          className="arrow right-arrow"
        />
        {repos.map((repo) => (
          <RepoCard
            key={repo.name}
            name={repo.name}
            description={repo.description}
            stargazers_count={repo.stargazers_count}
            svn_url={repo.svn_url}
          />
        ))}
      </div>
    )
  );
}
