import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationPage.css';

interface RegistrationPageProps {
  setIsLoggedIn: (value: boolean) => void;
}

const RegistrationPage: React.FC<RegistrationPageProps> = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [registrationError, setRegistrationError] = useState<string | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegistration = () => {
    // Basic validation
    if (!username || !password || !email) {
      setRegistrationError('All fields are required');
      return;
    }

    if (password.length < 6) {
      setRegistrationError('Password must be at least 6 characters long');
      return;
    }

    // Get existing users from localStorage or initialize empty array
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Check if username already exists
    const userExists = existingUsers.find((user: any) => user.username === username);
    if (userExists) {
      setRegistrationError('Username already exists');
      return;
    }

    // Add new user to the array
    const newUser = { username, password, email };
    const updatedUsers = [...existingUsers, newUser];
    
    // Save updated users array to localStorage
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

    console.log('Registration data saved:', { username, password, email });
    
    setRegistrationSuccess('Registration successful! You can now login.');
    setRegistrationError(null);

    // Automatically navigate to login after 2 seconds
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const handleGoToLogin = () => {
    navigate('/');
  };

  return (
    <div className="registration-page">
      <h1>Registration</h1>
      <form className="registration-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="registration-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="registration-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="registration-input"
        />
        <button onClick={handleRegistration} className="primary-button">
          Register
        </button>
        <button onClick={handleGoToLogin} className="secondary-button">
          Already have an account? Login
        </button>
      </form>
      {registrationError && <div className="registration-error">{registrationError}</div>}
      {registrationSuccess && <div className="registration-success">{registrationSuccess}</div>}
    </div>
  );
};

export default RegistrationPage;