import "./App.css";
import { Routes, Route } from "react-router-dom";
import GithubProfile from "./components/GithubPage";
import RepoDetails from "./components/RepoDetails";
function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<GithubProfile />} />
        <Route path="/repo/:username/:reponame" element={<RepoDetails />} />
      </Routes>
    </div>
  );
}

export default App;
