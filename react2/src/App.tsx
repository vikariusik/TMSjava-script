import "./App.css";
import PostContainer from "./components/PostContainer";
import LoginPage from "./components/LoginPage";
import SinglePostPage from "./components/SinglePostPage";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  // Initialize isLoggedIn from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false"); // Clear login state in localStorage
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true"); // Save login state in localStorage
  };

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          {isLoggedIn && (
            <>
              <button onClick={handleLogoutClick} className="menu-button">
                Logout
              </button>
              <button
                onClick={() => {
                  window.location.href = "/posts";
                }}
                className="menu-button"
              >
                Go to Posts
              </button>
            </>
          )}
        </header>
        <main className="app-main">
          <Routes>
            <Route
              path="/"
              element={
                !isLoggedIn ? (
                  <LoginPage setIsLoggedIn={handleLogin} />
                ) : (
                  <PostContainer />
                )
              }
            />
            <Route
              path="/posts"
              element={
                !isLoggedIn ? (
                  <LoginPage setIsLoggedIn={handleLogin} />
                ) : (
                  <PostContainer />
                )
              }
            />
            <Route
              path="/post/:id"
              element={
                !isLoggedIn ? (
                  <LoginPage setIsLoggedIn={handleLogin} />
                ) : (
                  <SinglePostPage />
                )
              }
            />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>© 2025 Vital Kisel Blog</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
