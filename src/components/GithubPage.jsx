import { useState } from "react";
import UserProfile from "./UserProfile";
import UserRepos from "./UserRepos";

function GitHubPage() {
  const [username, setUsername] = useState("");
  const [reposCount, setReposCount] = useState(null);
  return (
    <div className="page-container">
      <UserProfile setUsername={setUsername} setReposCount={setReposCount} />
      <UserRepos username={username} reposCount={reposCount} />
    </div>
  );
}

export default GitHubPage;
