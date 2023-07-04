import React, { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/user.js";
import { useNavigate, useLocation } from "react-router-dom";
import { socket } from "../../App.js";
import { useNotification } from "../../hooks/useNotification.js";
import "./CssBottomButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faListCheck,
  faGift,
  faSquarePhone,
  faComments,
} from "@fortawesome/free-solid-svg-icons";

export default function BottomButton() {
  const user = useRecoilValue(userState);
  useNotification();

  const [activeItem, setActiveItem] = useState(() => {
    const savedActiveItem = localStorage.getItem("activeItem");
    return savedActiveItem ? parseInt(savedActiveItem, 10) : 0;
  });

  const onItemClick = (index) => {
    setActiveItem(index);
    localStorage.setItem("activeItem", index.toString());
  };

  const navigate = useNavigate();
  const location = useLocation();

  const onCreateRoom = useCallback(() => {
    const roomName = `${user.user_id}'s_room`;
    socket.emit("create-room", { roomName, user }, (response) => {
      if (response.number === 2) {
        socket.emit("join-room", response.payload, () => {
          navigate(`/chat/${response.payload}`);
        });
      }
      if (response.number === 0) return alert(response.payload);
      navigate(`/chat/${response.payload}`);
    });
  }, [navigate, user]);

  useEffect(() => {
    const navigation_items_elms = document.querySelectorAll(
      ".navigation-bar .list-items .item"
    );

    navigation_items_elms.forEach((item, index) => {
      item.addEventListener("click", () => onItemClick(index));
    });

    return () => {
      navigation_items_elms.forEach((item, index) => {
        item.removeEventListener("click", () => onItemClick(index));
      });
    };
  }, []);

  useEffect(() => {
    const path = location.pathname;
    let activeIndex = 0;

    if (path === "/format/child") {
      activeIndex = 0;
    } else if (path === "/format/child/mission") {
      activeIndex = 1;
    } else if (path === "/format/child/wishlist") {
      activeIndex = 2;
    } else if (path.startsWith("/chat")) {
      activeIndex = 3;
    } else if (path === "/format/child/video") {
      activeIndex = 4;
    }

    setActiveItem(activeIndex);
    localStorage.setItem("activeItem", activeIndex.toString());
  }, [location]);

  return (
    <>
      <nav className="navigation-bar">
        <ul className="list-items">
          <span
            className="pointer"
            style={{ left: `${(100 / 5) * activeItem}%` }}
          ></span>
          <li className={`item ${activeItem === 0 ? "active" : ""}`}>
            <a className="link" href="/format/child" onClick={() => onItemClick(0)}>
              <FontAwesomeIcon icon={faHome} size="2x" />
            </a>
          </li>
          <li className={`item ${activeItem === 1 ? "active" : ""}`}>
            <a className="link" href="/format/child/mission" onClick={() => onItemClick(1)}>
              <FontAwesomeIcon icon={faListCheck} size="2x" />
            </a>
          </li>
          <li className={`item ${activeItem === 2 ? "active" : ""}`}>
            <a className="link" href="/format/child/wishlist" onClick={() => onItemClick(2)}>
              <FontAwesomeIcon icon={faGift} size="2x" />
            </a>
          </li>
          <li className={`item ${activeItem === 3 ? "active" : ""}`}>
            <button className="link" onClick={onCreateRoom}>
              <FontAwesomeIcon icon={faComments} size="2x" />
            </button>
          </li>
          <li className={`item ${activeItem === 4 ? "active" : ""}`}>
            <a className="link" href="/format/child/video" onClick={() => onItemClick(4)}>
              <FontAwesomeIcon icon={faSquarePhone} size="2x" />
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
