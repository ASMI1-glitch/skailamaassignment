import React from 'react';
import styles from './Upload.module.css';

import SidebarNavigation from '../SidebarNavigation/SidebarNavigation';
import PodcastUploader from '../PodcastUploader/PodcastUploader';

const UploadSection = () => {
  return (
    <div className={styles.mainContainer}>
      <SidebarNavigation />
      <PodcastUploader />
    </div>
  );
};

export default UploadSection;
