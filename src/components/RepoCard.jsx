import { Link } from "react-router-dom";

export default function RepoCard({
  name,
  description,
  stargazers_count,
  svn_url,
  username,
}) {
  return (
    <div className="profile-repo">
      <Link to={`/repo/${username}/${name}`}>
        <h3 className="repo-title">{name}</h3>
      </Link>
      <p className="repo-desc">{description}</p>
      <div className="info">
        <div className="starContainer">
          <img src="/assets/images/star-solid-full.svg" alt="star-solid-full" />
          <span>Star</span>
          <span className="starCount">{stargazers_count}</span>
        </div>
        <button
          className="Repobtn liquid"
          onClick={() => window.open(svn_url, "_blank")}
        >
          Visit Repo
        </button>
      </div>
    </div>
  );
}
