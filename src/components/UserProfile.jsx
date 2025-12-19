import { useState, useRef, useEffect } from "react";
import UserCard from "./UserCard";

export default function UserProfile({ onUserFetched }) {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchBtnRef = useRef(null);

  async function fetchGithubAPI() {
    if (!username.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const url = `https://api.github.com/users/${username}`;
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("User not found");
        }
        throw new Error("Something went wrong, try again later");
      }

      const data = await response.json();

      onUserFetched(data.login);

      const {
        name,
        login,
        bio,
        company,
        followers,
        following,
        location,
        avatar_url,
      } = data;

      setUser({
        name,
        login,
        bio,
        company,
        followers,
        following,
        location,
        avatar_url,
      });
    } catch (err) {
      setError(err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Enter") {
        fetchBtnRef.current.click();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="left-page">
      <h1>Github Profile Viewer</h1>

      <div className="search-bar">
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button
          className="btn"
          onClick={fetchGithubAPI}
          disabled={loading}
          ref={fetchBtnRef}
        >
          {loading ? "Loading..." : "Fetch"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}
      {user && <UserCard {...user} />}
    </div>
  );
}
