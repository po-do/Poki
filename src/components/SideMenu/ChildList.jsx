import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import "./ChildList.css";
export default function ChildList({isOpen}) {
  const [user, setUser] = useState('기본 사용자');

  const handleLeftClick = () => {
    setUser('전유진');
  };

  const handleRightClick = () => {
    setUser('지수현');
  };

  return (
    <div className="childListContainer line" >
      <FaAngleLeft style={{display: isOpen ? "block" : "none", cursor: 'pointer'}} className="arrow left" onClick={handleLeftClick} />
      <div className="childListProfile">
        <img
          className="childListImage"
          width="50"
          src="https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148907008/medium/1501685726/enhance"
          alt=""
        />
        <h4 style={{display: isOpen ? "block" : "none"}} >{user}</h4>
      </div>
      <FaAngleRight style={{display: isOpen ? "block" : "none", cursor: 'pointer'}} className="arrow right" onClick={handleRightClick} />
    </div>
  );
}
