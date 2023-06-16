import React, { useState } from "react";
import styles from "./SideMenu.module.css";
import ChildList from "./ChildList";
import SideButton from "./SideButton";
import Profile from "./Profile";
import {
  FaHome,
  FaBars,
  FaUserAlt,
  FaShoppingBasket,
  FaRegCalendarAlt,
  FaHistory,
  FaComment,
  FaCog,
  FaSignOutAlt,
  FaBookReader,
} from "react-icons/fa";

export default function SideMenu({type}) {
  const [isOpen, setIsOpen] = useState(true);
  const menuBar = () => setIsOpen(!isOpen);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const menuTop = [
    {
      path: `/format/${type}`,
      name: "Home",
      icon: <FaHome />,
    },
    {
      path: `/format/${type}/mission`,
      name: "미션관리",
      icon: <FaBookReader />,
    },
    {
      path: `/format/${type}/wishlist`,
      name: "위시리스트",
      icon: <FaShoppingBasket />,
    },
    {
      path: `/format/${type}/calender`,
      name: "캘린더",
      icon: <FaRegCalendarAlt />,
    },
    {
      path: `/format/${type}/message`,
      name: "메세지",
      icon: <FaComment />,
    },
    {
      path: `/format/${type}/history`,
      name: "기록",
      icon: <FaHistory />,
    },
  ];

  const menuBottom = [
    {
      path: `/format/${type}/mypage`,
      name: "마이페이지",
      icon: <FaUserAlt />,
    },
    {
      path: `/format/${type}/setting`,
      name: "설정",
      icon: <FaCog />,
    },
    {
      path: "/",
      name: isLoggedIn ? "Logout" : "Login",
      icon: <FaSignOutAlt />,
    },
  ];

  return (
    <>
      <div
        style={{ width: isOpen ? "250px" : "80px" }}
        className={styles.sideBar}
      >
        <div>
          <div className={styles.topSection}>
            <div style={{ display: isOpen ? "block" : "none" }}>
              <img
                width="50"
                src="https://cdn-icons-png.flaticon.com/512/2431/2431996.png"
                alt=""
              />
            </div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className={styles.logo}
            >
              Poki
            </div>
            <div
              style={{ marginLeft: isOpen ? "15px" : "10px" }}
              className={styles.bars}
            >
              <FaBars onClick={menuBar} />
            </div>
          </div>

          <ChildList isOpen={isOpen} />          <SideButton
            menuItem={menuTop}
            isOpen={isOpen}
            setIsLoggedIn={setIsLoggedIn}
          />
        </div>

        <div>
          <SideButton
            menuItem={menuBottom}
            isOpen={isOpen}
            setIsLoggedIn={setIsLoggedIn}
          />
          {isLoggedIn && <Profile isOpen={isOpen} />}
        </div>
      </div>
    </>
  );
}
