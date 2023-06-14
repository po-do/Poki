import React from "react";
import AppHeader from "../../components/AppHeader/AppHeader";
import SideMenu from "../../components/SideMenu/SideMenu";
import styles from "./ChildFormat.module.css";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();


export default function ChildFormat() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.container}>
        <div>
          <SideMenu type="child"></SideMenu>
        </div>
        <div className={styles.sideSection}>
          <AppHeader />
          <Outlet />
        </div>
      </div>
    </QueryClientProvider>
  );
}
