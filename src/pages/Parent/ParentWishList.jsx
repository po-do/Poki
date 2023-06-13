import React from "react";
import ProductCard from "../../components/UI/ProductCard";
import styles from "./ParentWishList.module.css";
import { wishListApi } from '../../api/wishlist.js';

export default function ParentWishList() {
  const [wishList, setWishList] = React.useState([]);

  const handleRegistGift = async () => {
    try {
      const response = await wishListApi.readWishList();
      setWishList(response.data.wish_list); // 위시리스트 데이터를 상태 변수에 저장
      console.log(response);
    } catch (error) {
      console.error('위시리스트 데이터를 가져오는 중 오류가 발생했습니다:', error);
    }
  };
  
  return (
    <div className={styles.container}>
      <div>
        <h1>Wish List</h1>
          <ProductCard /><ProductCard items={wishList} />
      </div>

      <button className="bg-blue-500 sm:rounded text-white p-2" onClick={handleRegistGift}>보상 등록</button>
    </div>
  );
}
