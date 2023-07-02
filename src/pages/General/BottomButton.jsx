import React, { useCallback, useEffect } from "react";
// recoil 사용
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/user.js";

import { useNavigate } from "react-router-dom";
import { socket } from "../../App.js";
import { useNotification } from "../../hooks/useNotification.js";

// NavBar
import "./CssBottomButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faListCheck, faGift, faSquarePhone, faComments } from "@fortawesome/free-solid-svg-icons";


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
        <li className="item active">
          <a className="link" href="/format/child">
            <FontAwesomeIcon icon={faHome} size="2x" />
          </a>
        </li>
        <li className="item">
          <a className="link" href="/format/child/mission">
            <FontAwesomeIcon icon={faListCheck} size="2x" />
          </a>
        </li>
        <li className="item">
          <a className="link" href="/format/child/wishlist">
            <FontAwesomeIcon icon={faGift} size="2x" />
          </a>
        </li>
        <li className="item">
          <a className="link" onClick={onCreateRoom}>
            <FontAwesomeIcon icon={faComments} size="2x" />
          </a>
        </li>
        <li className="item">
          <a className="link" href="/format/child/video">
            <FontAwesomeIcon icon={faSquarePhone} size="2x" />
          </a>
        </li>
      </ul>
    </nav>

    </>
  );
}
