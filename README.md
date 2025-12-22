
# GitHub Profile Viewer 🚀

A React application that allows users to search for any GitHub profile and explore user details along with their public repositories, featuring pagination, search, and caching for better performance.

---

## ✨ Features

* 🔍 **Search GitHub users** by username
* 👤 **Display user profile info**

  * Name & username
  * Bio & company
  * Followers / Following
  * Location & avatar
* 📦 **Browse public repositories**

  * Pagination (Next / Previous)
  * Client-side caching per page
* 🔎 **Search repositories by name**
* ⌨️ **Press Enter to search** (keyboard support)
* ⚡ **Optimized fetching**

  * Avoids duplicate API calls using cache
* 🛑 **Error & loading handling**

---

## 🧱 Project Structure

```
src/
├── components/
│   ├── GitHubPage.jsx
│   ├── UserProfile.jsx
│   ├── UserCard.jsx
│   ├── UserRepos.jsx
│   └── RepoCard.jsx
└── App.jsx
```

---

## 🧠 How It Works

### 1️⃣ GitHubPage (Parent)

* Acts as the main container
* Manages:

  * `username`
  * `public_repos`
* Passes data between profile & repositories components

---

### 2️⃣ UserProfile

* Fetches user data from GitHub API
* Handles:

  * Loading & error states
  * Keyboard interaction (Enter key)
* Sends fetched data to parent via callbacks

---

### 3️⃣ UserCard

* Displays user information in a clean card UI
* Handles fallback avatar when no image exists
* Shows followers, following & location only when data is valid

---

### 4️⃣ UserRepos

* Fetches repositories using:

  * Pagination (`per_page`)
  * Page-based caching
* Supports **two modes**:

  * Normal browsing
  * Search by repository name
* Uses GitHub Search API for accurate filtering

---

## 🌐 APIs Used

* GitHub User API

  ```
  https://api.github.com/users/{username}
  ```

* GitHub Repositories API

  ```
  https://api.github.com/users/{username}/repos
  ```

* GitHub Search Repositories API

  ```
  https://api.github.com/search/repositories
  ```

---

## 🛠️ Tech Stack

* **React**
* **React Hooks**

  * `useState`
  * `useEffect`
  * `useRef`
* **Fetch API**
* **CSS (Custom styling)**

---

## ⚠️ Notes & Improvements

* GitHub API rate limits apply (unauthenticated requests)
* Possible future enhancements:

  * 🔐 GitHub token support
  * 💾 Persist cache with `localStorage`
  * 📱 Better mobile responsiveness
  * ⭐ Sort repos by stars

---

## ▶️ Run Locally

```bash
npm install
npm run dev
```

---

## 👩‍💻 Author

Built with care by **Ghaida**
Clean code • Clear logic • Real-world API handling 💙

---
