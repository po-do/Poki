import React from "react";
import styles from "./Grapes.module.css";

export default function Grapes({ GrapesCount }) {
  return (
    <div>
      <div className={styles.container}>
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
