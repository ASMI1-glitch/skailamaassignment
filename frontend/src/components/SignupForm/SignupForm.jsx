import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // optional logo

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate a local unique ID
    const uniqueId = 'user-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('localUserId', uniqueId);
    localStorage.setItem('localEmail', email);

    // Optional backend attempt
    try {
      await fetch('https://skailamaassignment-rgnw.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
    } catch (err) {
      console.warn('Backend request failed, but user saved locally.');
    }

    navigate('/transcript'); // Always redirect
  };

  return (
    <div className="container">
      <div className="right">
        <img src={logo} alt="Logo" className="image2" />

        <p className="intro">
          Welcome to <br />
          <span className="introQ">Quest.AI</span>
        </p>

        <form className="formData" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="inputTag"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="inputTag"
          />

          <button type="submit" className="button">
            Sign Up & Go to Transcript
          </button>
        </form>

        <p className="noAccount">
          Already have an account?{' '}
          <span className="createAccount" onClick={() => navigate('/')}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
