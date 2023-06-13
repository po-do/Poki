import React, {useState,useEffect} from "react";
import ProductCard from "../../components/UI/ProductCard";
import PodoRegister from "../../components/Modal/podoRegister"
import { getWishlistByUserId } from '../../api/wishlist.ts';

export default function ParentWishList() {
  const [showModal, setShowModal] = useState(false);
  const [wishList, setWishList] = useState([]);
  const [choiceId, setChoiceId] = useState(false);

  useEffect(() => {
    // Fetch wishlist data when the component mounts
    getRegistGift();
  }, [wishList]);


const getRegistGift = async () => {
  try {
    // Fetch all wishlist data for the user ID
    const userid = 5; // Replace with the actual user ID
    const wishlistData = await getWishlistByUserId({ userid: userid });
    // console.log("Fetched wishlist data:", wishlistData);
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
        if (item){
          return <ProductCard key={item.id} data={item} />;
        }
      })}
    </div>
    <div>
      <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={openModal}>보상 등록</button>
      {showModal && <PodoRegister onClose={closeModal} choiceId={choiceId}/>}
    </div>
  </div>
);
}
