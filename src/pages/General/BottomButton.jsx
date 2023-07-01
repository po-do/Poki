import React, { useCallback, useEffect, useState } from "react";
// recoil 사용
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/user.js";
import CodeConnectModal from "../../components/Modal/CodeConnectModal.jsx";
import {
  HomeIcon,
  GiftIcon,
  VideoCameraIcon,
  ChatBubbleLeftRightIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";

// ======================================
import { useNavigate } from "react-router-dom";
import { socket } from "../../App.js";
import { useNotification } from "../../hooks/useNotification.js";

// NavBar
import "./CssBottomButton.css";

const navigation = [
  // 홈
  { name: "홈", href: "/format/child", icon: HomeIcon, current: false },
  // 미션
  {
    name: "미션",
    href: "/format/child/mission",
    icon: ListBulletIcon,
    current: false,
  },
  // 위시리스트
  {
    name: "위시리스트",
    href: "/format/child/wishlist",
    icon: GiftIcon,
    current: false,
  },
  // 화상통화
  {
    name: "화상통화",
    href: "/format/child/video",
    icon: VideoCameraIcon,
    current: false,
  },
];

export default function BottomButton() {
  const user = useRecoilValue(userState);

  useNotification();

  useEffect(() => {
    const navigationItems = document.querySelectorAll(
      ".navigation-bar .list-items .item"
    );
    const navigationPointer = document.querySelector(
      ".navigation-bar .pointer"
    );

    const handleClick = (e) => {
      e.preventDefault();

      navigationItems.forEach((item) => item.classList.remove("active"));
      e.currentTarget.classList.add("active");

      const parentWidth = e.currentTarget.parentElement.clientWidth;
      const leftPercent =
        (parentWidth / navigationItems.length) *
        Array.from(navigationItems).indexOf(e.currentTarget);
      navigationPointer.style.left = `${leftPercent}px`;
    };

    navigationItems.forEach((item) => {
      item.addEventListener("click", handleClick);
    });

    return () => {
      navigationItems.forEach((item) => {
        item.removeEventListener("click", handleClick);
      });
    };
  }, []);

  const navigate = useNavigate();

  const onCreateRoom = useCallback(() => {
    const roomName = `${user.user_id}'s_room`;
    socket.emit("create-room", { roomName, user }, (response) => {
      if (response.number === 2) {
        socket.emit("join-room", response.payload, () => {
          navigate(`/chat/${response.payload}`);
        }); // 이미 채팅방이 존재할 경우 바로 입장
      }
      if (response.number === 0) return alert(response.payload);
      navigate(`/chat/${response.payload}`);
    });
  }, [navigate]);

  return (
    <>
      <nav className="navigation-bar">
        <ul className="list-items">
          <span className="pointer"></span>

          {navigation.map((item) => (
            <li key={item.name} className="item">
              <button
                className="link"
                onClick={() =>
                  (window.location.href = `${item.href}`)
                }
              >
                <item.icon />
              </button>
            </li>
          ))}
          <li key="채팅" className="item">
            <button className="link" onClick={onCreateRoom}>
              <ChatBubbleLeftRightIcon />
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
