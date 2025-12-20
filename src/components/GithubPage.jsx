import { useState } from "react";
import UserProfile from "./UserProfile";
import UserRepos from "./UserRepos";

function GitHubPage() {
  const [username, setUsername] = useState(null);
  const [publicRepos, setPublicRepos] = useState(null);

  return (
    <div className="page-container">
      <UserProfile onUserFetched={setUsername} onFetch={setPublicRepos} />
      <UserRepos username={username} public_repos={publicRepos} />
    </div>
  );
}

export default GitHubPage;
