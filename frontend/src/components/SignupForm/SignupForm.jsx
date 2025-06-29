import React, { useState } from 'react';
import styles from './Signup.module.css';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { useAsmi } from '../../context/contextAsmi';
import axios from 'axios';

const SignupForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useAsmi();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const { email, password } = formData;

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.post(
        'https://skailamaassignment-rgnw.onrender.com/api/register', // ✅ UPDATED URL
        { email, password },
        { withCredentials: true } // Optional: include if cookies/session needed
      );

      localStorage.setItem('token', data.token);
      setUser(data.user);
      navigate('/');
    } catch (err) {
      console.error('Signup error:', err.response?.data || err.message);
      setErrorMessage(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.right}>
        <img src={logo} alt="Quest.AI Logo" className={styles.image2} />

        <p className={styles.intro}>
          Welcome to <br />
          <span className={styles.introQ}>Quest.AI</span>
        </p>

        <form className={styles.formData} onSubmit={handleSignup}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className={styles.inputTag}
            value={formData.email}
            onChange={handleInputChange}
            autoComplete="email"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={styles.inputTag}
            value={formData.password}
            onChange={handleInputChange}
            autoComplete="new-password"
          />

          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? <span className={styles.loader}></span> : 'Register'}
          </button>
        </form>

        <p className={styles.noAccount}>
          Already have an account?{' '}
          <span className={styles.createAccount} onClick={() => navigate('/')}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
