import React from "react";
import image1 from "../../assets/Group.png";
import styles from "./FrontPageContent.module.css";

function FrontPageContent() {
  return (
    <div className={styles.container}>
      <img src={image1} alt="Not Found" />
      <div className={styles.text}>
        <h1>Welcome aboard my friend</h1>
        <p>just a couple of click and we start</p>
      </div>
    </div>
  );
}

export default FrontPageContent;
