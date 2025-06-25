import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Get default users and registered users from localStorage
    const defaultUsers = [
      { username: 'admin', password: '12345' },
      { username: '1', password: '1' }
    ];
    
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Combine default users with registered users
    const allUsers = [...defaultUsers, ...registeredUsers];

    // Check if the entered username and password match any user
    const foundUser = allUsers.find((u) => u.username === username && u.password === password);
    
    setUser(foundUser || null);
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("isLoggedIn", "true"); // Update the login state
      setLoginError(null); // Clear any previous error
      
      // Save current user to localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      navigate('/posts'); // Navigate to posts page
    } else if (user === null && (username || password)) {
      setLoginError('Invalid username or password'); // Set error message
    }
  }, [user, username, password]);

  const handleGoToRegistration = () => {
    navigate('/registration');
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button onClick={handleLogin} className="primary-button">
          Login
        </button>
        <button onClick={handleGoToRegistration} className="secondary-button">
          Don't have an account? Register
        </button>
      </form>
      {loginError && <p className="login-error">{loginError}</p>}
    </div>
  );
};

export default LoginPage;