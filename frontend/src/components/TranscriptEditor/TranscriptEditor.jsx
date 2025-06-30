// File: src/pages/TranscriptEditor.jsx

import React, { useState } from 'react';
import styles from './Transcript.module.css';

import arrowIcon from '../../assets/ep_back.png';
import logoutIcon from '../../assets/logout-box-r-line.png';
import homeIcon from '../../assets/home.png';
import notificationIcon from '../../assets/notification-line.png';

import api from '../../config/api';
import { useNavigate } from 'react-router-dom';
import SidebarNavigation from '../SidebarNavigation/SidebarNavigation';

const TranscriptEditor = () => {
  const navigate = useNavigate();

  const [originalTranscript, setOriginalTranscript] = useState([
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam..."
  ]);

  const [editedTranscript, setEditedTranscript] = useState([...originalTranscript]);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditChange = (index, value) => {
    const updatedTranscript = [...editedTranscript];
    updatedTranscript[index] = value;
    setEditedTranscript(updatedTranscript);
  };

  const handleSaveTranscript = () => {
    setOriginalTranscript([...editedTranscript]);
    setIsEditing(false);
    alert('Transcript saved!');
  };

  const handleDiscardChanges = () => {
    setEditedTranscript([...originalTranscript]);
    setIsEditing(false);
  };

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleLogout = async () => {
    try {
      await api.post('/api/logout');
      localStorage.removeItem('token');
      alert('Logout Successfully');
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
      alert('Logout failed. Please try again.');
    }
  };

  const handleBack = () => {
    navigate('/upload');
  };

  return (
    <div className={styles.container}>
      <SidebarNavigation className={styles.leftSide} />

      <main className={styles.mainContent}>
        {/* Top Navigation */}
        <header className={styles.headingHome}>
          <div className={styles.arrow}>
            <img src={homeIcon} alt="Home" className={styles.homeIcon} />
            <p className={styles.headingHomeSample}>
              Home Page / Sample Project / <span className={styles.headingHomeSpan}>Add your podcast</span>
            </p>
          </div>

          <div className={styles.groupIcon}>
            <img src={notificationIcon} alt="Notifications" className={styles.notification} />
            <img src={logoutIcon} alt="Logout" className={styles.notification} onClick={handleLogout} />
          </div>
        </header>

        {/* Page Header */}
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>
            <img src={arrowIcon} alt="Back" className={styles.arrowIcon} onClick={handleBack} />
            Edit Transcript
          </h2>

          <div className={styles.headerButtons}>
            {isEditing ? (
              <>
                <button className={styles.discardButton} onClick={handleDiscardChanges}>Discard</button>
                <button className={styles.saveButton} onClick={handleSaveTranscript}>Save</button>
              </>
            ) : (
              <button className={styles.editButton} onClick={handleStartEditing}>Edit</button>
            )}
          </div>
        </div>

        {/* Editable Transcript Section */}
        <section className={styles.transcriptContainer}>
          {editedTranscript.map((text, index) => (
            <div key={index} className={styles.transcriptItem}>
              <textarea
                className={styles.textarea}
                value={text}
                onChange={(e) => handleEditChange(index, e.target.value)}
                disabled={!isEditing}
              />
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default TranscriptEditor;
