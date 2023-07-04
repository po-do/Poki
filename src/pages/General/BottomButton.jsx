import React, { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/user.js";
import { useNavigate } from "react-router-dom";
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
  };

  const navigate = useNavigate();

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
  }, [navigate]);

  useEffect(() => {
    const handleClick = (index) => {
      setActiveItem(index);
      localStorage.setItem("activeItem", index.toString());
    };
  
    const navigation_items_elms = document.querySelectorAll(
      ".navigation-bar .list-items .item"
    );
  
    const navigation_pointer = document.querySelector(
      ".navigation-bar .pointer"
    );
  
    navigation_items_elms.forEach((item, index) => {
      item.addEventListener("click", handleClick.bind(null, index));
    });
  
    return () => {
      navigation_items_elms.forEach((item, index) => {
        item.removeEventListener("click", handleClick.bind(null, index));
      });
    };
  }, []);

  return (
    <>
      <nav className="navigation-bar">
        <ul className="list-items">
          <span
            className="pointer"
            style={{ left: `${(100 / 5) * activeItem}%` }}
          ></span> 
          <li className={`item ${activeItem === 0 ? "active" : ""}`}>
            <a className="link" href="/format/child">
              <FontAwesomeIcon icon={faHome} size="2x" />
            </a>
          </li>
          <li className={`item ${activeItem === 1 ? "active" : ""}`}>
            <a className="link" href="/format/child/mission">
              <FontAwesomeIcon icon={faListCheck} size="2x" />
            </a>
          </li>
          <li className={`item ${activeItem === 2 ? "active" : ""}`}>
            <a className="link" href="/format/child/wishlist">
              <FontAwesomeIcon icon={faGift} size="2x" />
            </a>
          </li>
          <li className={`item ${activeItem === 3 ? "active" : ""}`}>
            <button className="link" onClick={onCreateRoom}>
              <FontAwesomeIcon icon={faComments} size="2x" />
            </button>
          </li>
          <li className={`item ${activeItem === 4 ? "active" : ""}`}>
            <a className="link" href="/format/child/video">
              <FontAwesomeIcon icon={faSquarePhone} size="2x" />
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
