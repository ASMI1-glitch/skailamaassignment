// File: src/pages/Plan.jsx
import React, { useState, useEffect } from 'react';
import styles from './Plan.module.css';
import logo from '../../assets/colorlogo.png';
import notificationIcon from '../../assets/notifications.png';
import settingsIcon from '../../assets/setting.png';
import plusIcon from '../../assets/plus.png';
import groupImage from '../../assets/Group 16.png';
import api from '../../config/api';
import { useNavigate } from 'react-router-dom';

const Plan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [planName, setPlanName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [plans, setPlans] = useState([]);
  const [planCount, setPlanCount] = useState(0);
  const [isListVisible, setIsListVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/api/projects/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlans(response.data);
      setPlanCount(response.data.length);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const handleCreatePlan = async () => {
    if (!planName.trim()) {
      setErrorMessage('Plan name is required!');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('Missing authentication. Please log in.');
        return;
      }

      const response = await api.post(
        '/api/projects/create',
        { name: planName },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201 || response.status === 200) {
        alert('Plan created successfully');
        setSuccessMessage('Plan created successfully');
        setPlanName('');
        setIsModalOpen(false);
        fetchPlans();
        setIsListVisible(true);
      } else {
        setErrorMessage('Unexpected server response.');
      }
    } catch (err) {
      console.error('Create plan error:', err.response?.data || err.message);
      setErrorMessage(err.response?.data?.error || 'Failed to create plan.');
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToUpload = () => navigate('/upload');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <div className={styles.icons}>
          <img src={settingsIcon} alt="Settings" className={styles.icon} />
          <img src={notificationIcon} alt="Notifications" className={styles.icon} />
        </div>
      </header>

      {isListVisible ? (
        <section className={styles.plansSection} onClick={navigateToUpload}>
          <div className={styles.plansHeader}>
            <h1 className={styles.plansHeading}>Plans</h1>
            <button className={styles.buttonTagPlan} onClick={toggleModal}>
              <img src={plusIcon} alt="Add" className={styles.add} />
              <span className={styles.createPlan}>Create New Plan</span>
            </button>
          </div>

          <div className={styles.planCountCard}>
            <h2>Total Plans</h2>
            <p>{planCount}</p>
          </div>
        </section>
      ) : (
        <section className={styles.details}>
          <h1 className={styles.heading}>Create a New Plan</h1>
          <img src={groupImage} alt="Visual" className={styles.mainImg} />
          <p className={styles.description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae impedit quibusdam quisquam quidem, excepturi deserunt maiores nostrum odio aspernatur veniam.
          </p>
          <button className={styles.buttonTag} onClick={toggleModal}>
            <img src={plusIcon} alt="Add" className={styles.add} />
            <span className={styles.create}>Create New Plan</span>
          </button>
        </section>
      )}

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h1 className={styles.modalHeading}>Create Plan</h1>
            <div className={styles.inputGroup}>
              <label className={styles.modalLabel}>Plan Name:</label>
              <input
                type="text"
                placeholder="Type Here"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                className={styles.inputModal}
              />
              {errorMessage && <p className={styles.error}>{errorMessage}</p>}
              {successMessage && <p className={styles.success}>{successMessage}</p>}
            </div>
            <div className={styles.buttonGroup}>
              <button onClick={toggleModal} className={styles.modalCancel}>Cancel</button>
              <button onClick={handleCreatePlan} disabled={isLoading} className={styles.createButton}>
                {isLoading ? <span className={styles.loader}></span> : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plan;
