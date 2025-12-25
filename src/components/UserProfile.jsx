import { useEffect, useState, useRef } from "react";
import UserCard from "./UserCard";
import useFetch from "../hook/useFetch";
export default function UserProfile({ setUsername, setReposCount }) {
  const [requestUrl, setRequestUrl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, loading, error } = useFetch(requestUrl);
  const url = `https://api.github.com/users/${searchTerm}`;

  const fetchBtnRef = useRef(null);

  const handleClick = () => {
    setUsername(searchTerm);
    setRequestUrl(url);
  };

  useEffect(() => {
    setReposCount(data?.public_repos);
  }, [data]);

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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value?.trim())}
        />

        <button
          className="btn"
          onClick={handleClick}
          disabled={loading}
          ref={fetchBtnRef}
        >
          {loading ? "Loading..." : "Fetch"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}
      {data && <UserCard {...data} />}
    </div>
  );
}
