import React, { useState } from 'react';
import './LoginPage.css';

interface LoginPageProps {
  setIsLoggedIn: (value: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  const users = [
    { username: 'admin', password: '12345' },
    { username: '1', password: '1' }
  ];

  const handleLogin = () => {
    // Check if the entered username and password match any user in the array
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
      setIsLoggedIn(true); // Update the login state
      setLoginError(null); // Clear any previous error
    } else {
      setLoginError('Invalid username or password'); // Set error message
    }
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
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
      </form>
      {loginError && <div className="login-error">{loginError}</div>}
    </div>
  );
};

export default LoginPage;