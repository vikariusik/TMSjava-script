import "./App.css";
import PostsPage from "./pages/PostsPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import SinglePostPage from "./pages/SinglePostPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import Header from "./components/Header";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import ImageModal from "./components/ImageModal";

const AppContent: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  return (
    <Router>
      <div className={`app ${isDarkMode ? "dark-theme" : "light-theme"}`}>
        <Header isLoggedIn={isLoggedIn} handleLogoutClick={handleLogoutClick} />
        <main className="app-main">
          <Routes>
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage setIsLoggedIn={handleLogin} />} />
            <Route element={<PrivateRoute />}>
              <Route
                path="/posts"
                element={<PostsPage />}
              />
              <Route
                path="/search"
                element={<SearchResultsPage />}
              />
              <Route
                path="/post/:id"
                element={<SinglePostPage />}
              />
              <Route
                path="*"
                element={<PostsPage />}
              />
            </Route>
          </Routes>
        </main>
        <footer className="app-footer">
          <p>© 2025 Vital Kisel Blog</p>
        </footer>
        <ImageModal />
      </div>
    </Router>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
