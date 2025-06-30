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
    <div className={styles.left}>
      <div className={styles.leftContainer}>
        <div className={styles.leftImageDiv}>
          <img src={logo} alt="Logo" className={styles.leftIcon} />
        </div>

        <div className={styles.leftContent}>
          <div className={styles.leftData}>
            <img src={iconAdd} alt="Add Podcast" className={styles.leftIconsData} />
            <p>Add your Podcast(s)</p>
          </div>

          <div className={styles.leftData}>
            <img src={iconCreate} alt="Create" className={styles.leftIconsData} />
            <p>Create & Repurpose</p>
          </div>

          <div className={styles.leftData}>
            <img src={iconWidget} alt="Widget" className={styles.leftIconsData} />
            <p>Podcast Widget</p>
          </div>

          <div className={styles.leftData}>
            <img src={iconUpgrade} alt="Upgrade" className={styles.leftIconsData} />
            <p>Upgrade</p>
          </div>
        </div>

        <hr className={styles.hrline} />

        <div className={styles.leftDownDiv}>
          <div className={styles.leftHelp}>
            <img src={iconSettings} alt="Settings" className={styles.leftIconsImage} />
            <p>Help</p>
          </div>

          <hr className={styles.hrline} />

          <div className={styles.settingContainer}>
            <img src={iconProfile} alt="Profile" className={styles.leftIconsImage} />
            <div className={styles.leftUserDetail}>
              <p className={styles.name}>UserName</p>
              <p className={styles.email}>test@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarNavigation;
