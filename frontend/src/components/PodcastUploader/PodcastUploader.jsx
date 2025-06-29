import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api';

import styles from './PodcastUploader.module.css';

import cloudUploadIcon from '../../assets/cloud_upload.png';
import rssIcon from '../../assets/image 1.png';
import youtubeIcon from '../../assets/image 2.png';
import fileUploadIcon from '../../assets/Vector.png';
import closeIcon from '../../assets/close-large-line.png';
import logoutIcon from '../../assets/logout-box-r-line.png';
import homeIcon from '../../assets/home.png';
import notificationIcon from '../../assets/notification-line.png';

const PodcastUploader = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', transcript: '' });
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const navigate = useNavigate();

  const uploadOptions = [
    {
      title: "RSS Feed",
      description: "Upload via RSS feed.",
      icon: rssIcon,
    },
    {
      title: "YouTube Video",
      description: "Upload using a YouTube video link.",
      icon: youtubeIcon,
    },
    {
      title: "Upload Files",
      description: "Upload from local device.",
      icon: fileUploadIcon,
    },
  ];

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpload = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to upload.");
        return;
      }

      const response = await api.post('/api/youtube/create', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Upload successful:', response.data);
      alert('Upload successful!');
      setUploadSuccess(true);
      toggleModal();
    } catch (error) {
      console.error('Upload error:', error.response?.data || error.message);
      alert('Upload failed. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/api/logout");
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  };

  if (uploadSuccess) {
    navigate("/transcript");
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <img src={homeIcon} alt="Home" className={styles.homeIcon} />
          <p>
            Home Page / Sample Project / <span className={styles.highlight}>Add your podcast</span>
          </p>
        </div>
        <div className={styles.actions}>
          <img src={notificationIcon} alt="Notifications" className={styles.icon} />
          <img src={logoutIcon} alt="Logout" className={styles.icon} onClick={handleLogout} />
        </div>
      </div>

      <h1 className={styles.title}>Add Podcast</h1>

      <div className={styles.uploadOptions}>
        {uploadOptions.map((option, idx) => (
          <div key={idx} className={styles.card} onClick={toggleModal}>
            <div className={styles.cardContent}>
              <h2>{option.title}</h2>
              <p>{option.description}</p>
            </div>
            <img src={option.icon} alt={option.title} className={styles.cardIcon} />
          </div>
        ))}
      </div>

      <div className={styles.dragDropSection}>
        <img src={cloudUploadIcon} alt="Upload" className={styles.cloudIcon} />
        <p>Select a file or drag and drop here</p>
        <p className={styles.supportedFormats}>MP4, MOV, MP3, WAV, PDF, DOCX, or TXT</p>
        <button onClick={toggleModal} className={styles.selectButton}>Select File</button>
      </div>

      {modalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>
                <img src={youtubeIcon} alt="YouTube" className={styles.youtubeIcon} />
                <h2>Upload from YouTube</h2>
              </div>
              <button onClick={toggleModal} className={styles.closeButton}>
                <img src={closeIcon} alt="Close" />
              </button>
            </div>

            <div className={styles.formGroup}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Transcript</label>
              <textarea
                name="transcript"
                value={formData.transcript}
                onChange={handleInputChange}
                className={styles.textarea}
              />
            </div>

            <div className={styles.modalFooter}>
              <button onClick={handleUpload} className={styles.uploadBtn}>Upload</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PodcastUploader;
