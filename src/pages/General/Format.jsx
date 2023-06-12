import React from "react";
import AppHeader from "../../components/AppHeader/AppHeader";
import SideMenu from "../../components/SideMenu/SideMenu";
import ParentMain from "../../pages/Parent/ParentMain";
import styles from "./Format.module.css";

export default function Format() {
  return (
    <>
      <div className={styles.container}>
        <div>
          <SideMenu></SideMenu>
        </div>
        <div className={styles.sideSection}>
          <AppHeader />
          <ParentMain />
        </div>
      </div>
    </>
  );
}
