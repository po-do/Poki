import React from "react";
import styles from "./ProductCard.module.css";

export default function ProductCard() {
  return (
    <div className={styles.cardContainer}>
      <button className={styles.closeButton}>X</button>
      <img
        src="https://thumbnail.10x10.co.kr/webimage/image/basic600/209/B002095704.jpg?cmd=thumb&w=200&h=200&fit=true&ws=false"
        alt=""
      />
      <div className={styles.cardDesc}>
        <input type="checkbox" name="" id="" />
        <p>카카오 인형</p>
      </div>
    </div>
  );
}
