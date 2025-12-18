import { useState } from "react";
import UserProfile from "./UserProfile";
import UserRepos from "./UserRepos";

function GitHubPage() {
  const [username, setUsername] = useState(null);

  return (
    <div style={{ display: "flex" }} className="page-container">
      <UserProfile onUserFetched={setUsername} />
      <UserRepos username={username} />
    </div>
  );
}

export default GitHubPage;
