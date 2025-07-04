// File: src/pages/Plan.jsx
import React, { useState, useEffect } from 'react';
import styles from './Plan.module.css';
import logo from '../../assets/colorlogo.png';
import notificationIcon from '../../assets/notifications.png';
import settingsIcon from '../../assets/setting.png';
import plusIcon from '../../assets/plus.png';
import groupImage from '../../assets/Group 16.png';
import { useNavigate } from 'react-router-dom';

const Plan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [planName, setPlanName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [plans, setPlans] = useState([]);
  const [planCount, setPlanCount] = useState(0);
  const [showPlans, setShowPlans] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = () => {
    const localPlans = JSON.parse(localStorage.getItem('plans')) || [];
    setPlans(localPlans);
    setPlanCount(localPlans.length);
    setShowPlans(localPlans.length > 0);
  };

  const toggleModal = () => setIsModalOpen(prev => !prev);

  const handleCreatePlan = () => {
    if (!planName.trim()) {
      setErrorMessage('Plan name is required!');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      const newPlan = {
        id: Date.now(),
        name: planName
      };

      const updatedPlans = [...plans, newPlan];
      localStorage.setItem('plans', JSON.stringify(updatedPlans));
      setPlans(updatedPlans);
      setPlanCount(updatedPlans.length);
      setPlanName('');
      setIsModalOpen(false);
      setShowPlans(true);
      setIsLoading(false);
    }, 400);
  };

  const navigateToUpload = () => {
    navigate('/upload');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>
        <div className={styles.icons}>
          <img src={settingsIcon} alt="Settings" className={styles.icon} />
          <img src={notificationIcon} alt="Notifications" className={styles.icon} />
        </div>
      </div>

      {showPlans ? (
        <div className={styles.plansSection}>
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

          <div className={styles.plansList}>
            {plans.map(plan => (
              <div
                key={plan.id}
                className={styles.planCard}
                onClick={navigateToUpload}
              >
                <p className={styles.planName}>{plan.name}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.details}>
          <h1 className={styles.heading}>Create a New Plan</h1>
          <img src={groupImage} alt="Group" className={styles.mainImg} />
          <p className={styles.description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae impedit quibusdam
            quisquam quidem, excepturi deserunt maiores nostrum odio aspernatur veniam.
          </p>
          <button className={styles.buttonTag} onClick={toggleModal}>
            <img src={plusIcon} alt="Add" className={styles.add} />
            <p className={styles.create}>Create New Plan</p>
          </button>
        </div>
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
            </div>
            <div className={styles.buttonGroup}>
              <button onClick={toggleModal} className={styles.modalCancel}>
                Cancel
              </button>
              <button
                onClick={handleCreatePlan}
                disabled={isLoading}
                className={styles.createButton}
              >
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
