import React from "react";
import styles from "./Grapes.module.css";

export default function Grapes() {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.uvas}>
          {/* 줄기 */}
          <div className={styles.tallo}></div>
          {/* 잎파리 */}
          <div className={styles.hojas}></div>
          {/* 1번째 */}
          <span className={styles.u1}></span>
          <span className={styles.u11}></span>
          {/* 2번쨰 */}
          <div className={styles.subir}>
            <span className={styles.u3}></span>
            <span className={styles.u4}></span>
          </div>
          <span className={styles.u2}></span>
          {/* 3번쨰줄 */}
          <div className={styles.bajar}>
            <span className={styles.u5}></span>
            <span className={styles.u6}></span>
          </div>
          <span className={styles.u8}></span>
          {/* 4번쨰줄 */}
          <span className={styles.u9}></span>
          <span className={styles.u7}></span>
          {/* 5번쨰줄 */}
          <span className={styles.u10}>
            <div className={styles.a7}></div>
          </span>
          {/* 11번째 부터 31번째 포도 */}
          {Array.from({ length: 21 }, (_, i) => i + 11).map((n) => (
            <span className={`${styles[`u${n}`]}`} key={n}></span>
          ))}
        </div>
      </div>
    </div>
  );
}
