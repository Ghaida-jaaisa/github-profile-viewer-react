import { useEffect, useState } from "react";
import RepoCard from "./RepoCard";
import useFetch from "../hook/useFetch";

export default function UserRepos({ username, reposCount }) {
  const repo_per_page = 4;
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [requestUrl, setRequestUrl] = useState(null);
  const { data: repos = [], loading, error } = useFetch(requestUrl);
  const number_of_pages = Math.max(
    1,
    Math.ceil(
      (Array.isArray(repos) ? reposCount ?? 0 : repos?.total_count ?? 0) /
        repo_per_page
    )
  );
  console.log(repos?.total_count);

  useEffect(() => {
    if (!username) return;
    setPage(1);
  }, [username]);

  useEffect(() => {
    if (!username) return;
    if (searchTerm?.trim().length === 0) {
      setRequestUrl(
        `https://api.github.com/users/${username}/repos?per_page=${repo_per_page}&page=${page}`
      );
      return;
    }
    const search_url = `https://api.github.com/search/repositories?q=${searchTerm?.trim()}+user:${username}+in:name&per_page=${repo_per_page}&page=${page}`;
    setRequestUrl(search_url);
  }, [username, page]);

  const handleSearch = () => {
    const value = searchTerm?.trim();
    if (value.length === 0) {
      setRequestUrl(
        `https://api.github.com/users/${username}/repos?per_page=${repo_per_page}&page=${page}`
      );
      return;
    }
    const search_url = `https://api.github.com/search/repositories?q=${value}+user:${username}+in:name&per_page=${repo_per_page}&page=${page}`;
    setRequestUrl(search_url);
  };

  // Change endpoint when clear searchTerm
  useEffect(() => {
    if (searchTerm.length === 0)
      setRequestUrl(
        `https://api.github.com/users/${username}/repos?per_page=${repo_per_page}&page=${page}`
      );
  }, [searchTerm]);

  const reposList = Array.isArray(repos) ? repos : repos?.items ?? [];

  if (!username) return <p>Please provide a username.</p>;

  if (loading) return <p>Loading repos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="user-repos">
      {
        <img
          src="/assets/images/arrow-left.svg"
          alt="arrow-left"
          className="arrow left-arrow"
          onClick={() => setPage((p) => (p === 1 ? number_of_pages : p - 1))}
        />
      }

      <h2 className={searchTerm ? "h2-span3" : "h2-span2"}>
        Public Repos: {!Array.isArray(repos) ? repos.total_count : reposCount}
      </h2>

      <div
        className={
          searchTerm.length ? "search-box-span-3" : "search-box-span-2"
        }
      >
        <button
          disabled={loading}
          className="btn-search"
          onClick={handleSearch}
        >
          <img
            src="/magnifying-glass-solid-full.svg"
            alt="magnifying-glass-solid-full"
          />
        </button>
        <input
          type="text"
          className="input-search"
          placeholder="Search..."
          maxLength={30}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value?.trim())}
        />
      </div>

      {
        <img
          src="/assets/images/arrow-right.svg"
          alt="arrow-right"
          className="arrow right-arrow"
          onClick={() => setPage((p) => (p < number_of_pages ? p + 1 : 1))}
        />
      }
      {reposList?.map((repo) => (
        <RepoCard
          key={repo.name}
          name={repo.name}
          description={repo.description}
          stargazers_count={repo.stargazers_count}
          svn_url={repo.svn_url}
        />
      ))}
    </div>
  );
}
