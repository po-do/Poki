import React, {useState,useEffect} from "react";
import ParentProductCard from "../../components/UI/ParentProductCard";
import PodoRegisterModal from "../../components/Modal/PodoRegisterModal";
import { getWishlistByUserId } from '../../api/wishlist.ts';

export default function ParentWishList() {
  const [showModal, setShowModal] = useState(false);
  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    getRegistGift();
  }, [wishList]);

  const getRegistGift = async () => {
    try {
      // const userid = 35; // Replace with the actual user ID
      const wishlistData = await getWishlistByUserId();
      setWishList(wishlistData.data.item);
    } catch (error) {
      console.log("Failed to fetch wishlist data:", error);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  
  return (
    <div>
      <div>
        <h1>Wish List</h1>
        {wishList.map((item) => {
          return <ParentProductCard key={item.id} data={item} />;
        })}
      </div>
      <div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded" onClick={openModal}>
          보상 등록
        </button>
        {showModal && <PodoRegisterModal onClose={closeModal} />}
      </div>
    </div>
  );
}