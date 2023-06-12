import React from "react";
import styles from "./UserProfile.module.css";

export default function UserProfile() {
  return (
    <>
      <h4>Profile</h4>
      <img
        src="https://www.edsys.in/wp-content/uploads/charles_schulz_1000x700.jpg"
        alt=""
        className={styles.profile}
      />
      <p>어린이1</p>
    </>
  );
}
