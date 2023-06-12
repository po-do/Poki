import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import styles from './ChildList.module.css';

export default function ChildList({isOpen}) {
  const [user, setUser] = useState('홍길동');

  const handleLeftClick = () => {
    setUser('전유진');
  };

  const handleRightClick = () => {
    setUser('지수현');
  };

  return (
    <div className={styles.line}>
    <div style={{display: isOpen ? "block" : "none", cursor: 'pointer'}} className={`${styles.line} ${styles.childButton}`}>자녀 목록</div>
    <div className={styles.childListContainer}>
        
        <FaAngleLeft style={{display: isOpen ? "block" : "none", cursor: 'pointer'}} className={`${styles.arrow} ${styles.left}`} onClick={handleLeftClick} />
        <div className="childListProfile">
        <img
            className={styles.childListImage}
            width="50"
            src="https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148907008/medium/1501685726/enhance"
            alt=""
        />
        <h4 style={{display: isOpen ? "block" : "none"}} >{user}</h4>
        </div>
        <FaAngleRight style={{display: isOpen ? "block" : "none", cursor: 'pointer'}} className={`${styles.arrow} ${styles.right}`} onClick={handleRightClick} />
    </div>
    </div>
    
  );
}
