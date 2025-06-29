import React from "react";
import styles from "./SidebarNavigation.module.css";

import logo from "../../assets/colorlogo.png";
import iconUpgrade from "../../assets/diamond-line.png";
import iconWidget from "../../assets/checkbox-multiple-blank-line.png";
import iconAdd from "../../assets/add-line.png";
import iconCreate from "../../assets/pencil-line.png";
import iconSettings from "../../assets/settings-2-line.png";
import iconProfile from "../../assets/profile.png";

const SidebarNavigation = () => {
  return (
    <div className={styles.sidebar}>
      {/* Top Section */}
      <div className={styles.sidebarTop}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>

        <div className={styles.menu}>
          <div className={styles.menuItem}>
            <img src={iconAdd} alt="Add Podcast" className={styles.icon} />
            Add your Podcast(s)
          </div>
          <div className={styles.menuItem}>
            <img src={iconCreate} alt="Create" className={styles.icon} />
            Create & Repurpose
          </div>
          <div className={styles.menuItem}>
            <img src={iconWidget} alt="Widget" className={styles.icon} />
            Podcast Widget
          </div>
          <div className={styles.menuItem}>
            <img src={iconUpgrade} alt="Upgrade" className={styles.icon} />
            Upgrade
          </div>
        </div>
      </div>

      <hr />

      {/* Bottom Section */}
      <div className={styles.sidebarBottom}>
        <div className={styles.helpSection}>
          <img src={iconSettings} alt="Settings" className={styles.icon} />
          Help
        </div>

        <hr className={styles.separator} />

        <div className={styles.profileSection}>
          <img src={iconProfile} alt="Profile" className={styles.profileImage} />
          <div className={styles.profileInfo}>
            <p className={styles.username}>UserName</p>
            <p className={styles.email}>test@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarNavigation;
