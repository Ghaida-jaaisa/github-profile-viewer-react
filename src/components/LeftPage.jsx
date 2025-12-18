import { useState } from "react";
import UserCard from "./UserCard";

export default function LeftPage() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");

  async function fetchGithubAPI() {
    try {
      const url = `https://api.github.com/users/${username}`;
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("User not found");
        }
        throw new Error("Something went wrong, try again later");
      }
      // All good
      const data = await response.json();
      const {
        name,
        login,
        bio,
        company,
        followers,
        following,
        location,
        public_repos,
        avatar_url,
        repos_url,
      } = data;

      setUser({
        name,
        login,
        bio,
        company,
        followers,
        following,
        location,
        public_repos,
        avatar_url,
        repos_url,
      });
    } catch (error) {
      setUser({ name: error.message });
    }
  }

  return (
    <div className="left-page">
      <h1>Github Profile Viewer</h1>
      <div className="search-bar">
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="btn" onClick={fetchGithubAPI}>
          Fetch
        </button>
      </div>
      {user && <UserCard {...user} />}
    </div>
  );
}
