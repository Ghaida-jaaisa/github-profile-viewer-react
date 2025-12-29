import { useParams, Link } from "react-router-dom";
import useFetch from "../hook/useFetch";

const RepoDetails = () => {
  const { username, reponame } = useParams();
  const { data: repo, loading, error } = useFetch(
    `https://api.github.com/repos/${username}/${reponame}`
  );

  if (loading) return <p className="loading">Loading repository details...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!repo) return <p>Repository not found.</p>;

  return (
    <div className="repo-details">
      <Link to="/" className="back-link">← Back to Profile</Link>
      <h1>{repo.name}</h1>
      <p className="repo-description">{repo.description || "No description available."}</p>
      
      <div className="repo-info">
        <div className="info-item">
          <strong>Owner:</strong> {repo.owner?.login}
        </div>
        <div className="info-item">
          <strong>Stars:</strong> {repo.stargazers_count}
        </div>
        <div className="info-item">
          <strong>Forks:</strong> {repo.forks_count}
        </div>
        <div className="info-item">
          <strong>Watchers:</strong> {repo.watchers_count}
        </div>
        <div className="info-item">
          <strong>Language:</strong> {repo.language || "Not specified"}
        </div>
        <div className="info-item">
          <strong>Open Issues:</strong> {repo.open_issues_count}
        </div>
        <div className="info-item">
          <strong>Created:</strong> {new Date(repo.created_at).toLocaleDateString()}
        </div>
        <div className="info-item">
          <strong>Last Updated:</strong> {new Date(repo.updated_at).toLocaleDateString()}
        </div>
      </div>
      
      <a 
        href={repo.html_url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="visit-repo-btn"
      >
        View on GitHub
      </a>
    </div>
  );
};

export default RepoDetails
