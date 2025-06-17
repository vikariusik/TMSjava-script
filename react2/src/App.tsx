import "./App.css";
import PostContainer from "./components/PostsPage";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import SinglePostPage from "./components/SinglePostPage";
import SearchResultsPage from "./components/SearchResultsPage";
import Header from "./components/Header";
import { useState } from "react";
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
        <Header isLoggedIn={isLoggedIn} handleLogoutClick={handleLogoutClick} />
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
              path="/registration"
              element={<RegistrationPage setIsLoggedIn={handleLogin} />}
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
              path="/search"
              element={
                !isLoggedIn ? (
                  <LoginPage setIsLoggedIn={handleLogin} />
                ) : (
                  <SearchResultsPage />
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
