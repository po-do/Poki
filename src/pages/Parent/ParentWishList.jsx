import React from "react";
import ProductCard from "../../components/UI/ProductCard";
import styles from "./ParentWishList.module.css";

export default function ParentWishList() {
  const handleRegistGift = () => {
    console.log("등록한 물품을 보상등록 서버에 요청");
  };
  return (
    <div className={styles.container}>
      <div>
        <h1>Wish List</h1>
        <ProductCard />
      </div>

      <button onClick={handleRegistGift}>보상 등록</button>
    </div>
  );
}
