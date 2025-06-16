import "./App.css";
import PostContainer from "./components/PostContainer";
import LoginPage from "./components/LoginPage";
import SinglePostPage from "./components/SinglePostPage";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <button onClick={handleLogoutClick} className="menu-button">
            Logout
          </button>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={!isLoggedIn ? <LoginPage setIsLoggedIn={setIsLoggedIn} /> : <PostContainer /> } />
            <Route path="/posts" element={!isLoggedIn ? <LoginPage setIsLoggedIn={setIsLoggedIn} /> : <PostContainer />} />
            <Route path="/post/:id" element={!isLoggedIn ? <LoginPage setIsLoggedIn={setIsLoggedIn} /> :<SinglePostPage />} />
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
