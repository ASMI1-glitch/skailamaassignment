/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Hero.module.css";

import maskedImage from "../../assets/Mask group.png";
import logoText from "../../assets/QuesLogo 1.png";
import logoIcon from "../../assets/logo.png";
import googleIcon from "../../assets/google.png";

import api from "../../config/api";
import { useAsmi } from '../../context/contextAsmi';

const Hero = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser } = useAsmi();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("http://localhost:8000/login", { email, password });
      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
      setUser(response.data.user);
      navigate("/projects");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className={styles.mainContainer}>
      {/* Left Side */}
      <div className={styles.left}>
        <div className={styles.imageContainer}>
          <img
            src={maskedImage}
            alt="Background Mask"
            className={styles.maskedImage}
          />
        </div>
        <div className={styles.data}>
          <img src={logoText} alt="Logo Text" className={styles.logo} />
          <div className={styles.newData}>
            <p className={styles.details}>
              Your podcast <br />
              will no longer <br />
              be just a hobby
            </p>
            <p className={styles.subtitle}>
              Supercharge Your Distribution <br />
              using your AI assistant!
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className={styles.right}>
        <img src={logoIcon} alt="Logo" className={styles.image2} />
        <p className={styles.intro}>
          Welcome to <br />
          <span className={styles.introQ}>Quest.AI</span>
        </p>

        <form className={styles.formData} onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.inputTag}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.inputTag}
          />

          <div className={styles.inputCheckboxDiv}>
            <label className={styles.checkboxlabel}>
              <input type="checkbox" />
              Remember me
            </label>
            <p className={styles.forgot}>Forgot Password?</p>
          </div>

          <button className={styles.button} disabled={loading}>
            {loading ? (
              <span className={styles.loader}></span>
            ) : (
              <span className={styles.loginName}>Login</span>
            )}
          </button>
        </form>

        <div className={styles.googleDiv}>
          <img
            src={googleIcon}
            alt="Continue with Google"
            className={styles.googleImg}
          />
          <p className={styles.googleName}>Continue with Google</p>
        </div>

        <p className={styles.noAccount}>
          Don’t have an account?{" "}
          <span className={styles.createAccount} onClick={goToSignup}>
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Hero;
