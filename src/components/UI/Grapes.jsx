import React, { useEffect, useState } from "react";
import styles from "./Grapes.module.css";
import { getBoardStatus } from "../../api/board.js";

export default function Grapes({ GrapesCount, message }) {
  const [showOverlay, setShowOverlay] = useState(null);
  const handleOverlayClick = () => {
    setShowOverlay(false);
  };

  const getState = async () => {
    const grapeStatus = await getBoardStatus();
    if (!grapeStatus.data.grape.blank) {
      setShowOverlay(true);
    }
    
  };

  useEffect(() => {
    getState();
  }, []);

  return (
    <div className="relative">
      <div className={styles.container}>
        {/* overlay 창 구현 */}
        {showOverlay && (
          <div
            className="flex-col rounded-2xl absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-10"
            onClick={handleOverlayClick}
          >
            {message.map((item) => (
              <React.Fragment key={item}>
                <p className="text-white text-2xl font-bold">{item}</p>
                <br />
              </React.Fragment>
            ))}
          </div>
        )}

        <div className={styles.uvas}>
          {/* 줄기 */}
          <div className={styles.tallo}></div>
          {/* 잎파리 */}
          <div className={styles.hojas}></div>
          {/* 1번째 부터 31번째 포도 */}
          {Array.from({ length: 31 }, (_, i) => i + 1).map((n) => (
            <span
              className={`${styles[`u${n}`]} ${
                n <= GrapesCount ? styles.grape : ""
              }`}
              key={n}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}
