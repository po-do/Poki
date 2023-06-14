import React, {useState,useEffect} from "react";
import ProductCard from "../../components/UI/ProductCard";
import { getWishlistByUserId } from '../../api/wishlist.ts';

export default function ParentWishList() {
  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    getRegistGift();
  }, [wishList]);

  const getRegistGift = async () => {
    try {
      const userid = 5; // Replace with the actual user ID
      const wishlistData = await getWishlistByUserId({ userid: userid });
      setWishList(wishlistData.data.item);
    } catch (error) {
      console.log("Failed to fetch wishlist data:", error);
    }
  };
  
  return (
    <div>
      <div>
        <h1>Wish List</h1>
        {wishList.map((item) => {
          return <ProductCard key={item.id} data={item} />;
        })}
      </div>
      <div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          
        >
          보상 등록
        </button>
      </div>
    </div>
  );
}
