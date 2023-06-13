import React from "react";
import AppHeader from "../../components/AppHeader/AppHeader";
import SideMenu from "../../components/SideMenu/SideMenu";
import styles from "./ParentFormat.module.css";
import { Outlet } from "react-router-dom";

export default function Format() {
  return (
    <>
      <div className={styles.container}>
        <div>
          <SideMenu></SideMenu>
        </div>
        <div className={styles.sideSection}>
          <AppHeader />
          <Outlet />
        </div>
      </div>
    </>
  );
}
