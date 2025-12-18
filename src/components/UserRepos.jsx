import { useEffect, useState } from "react";
import RepoCard from "./RepoCard";

export default function UserRepos({ username }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const repo_url = `https://api.github.com/users/${username}/repos`;

  useEffect(() => {
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

    fetchGithubRepos();
  }, [repo_url]);

  if (loading) return <p>Loading repos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    username && 
    <div className="user-repos">
      <h2>
        <b>Public Repos : {repos.length}</b>
      </h2>

      {repos.map((repo) => (
        <RepoCard
          name={repo.name}
          description={repo.description}
          stargazers_count={repo.stargazers_count}
          svn_url={repo.svn_url}
        />
      ))}
    </div>
  );
}
