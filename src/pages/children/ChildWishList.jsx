import React, { useState, useEffect } from "react";
import LinkRegister from "../../components/Modal/LinkRegisterModal";
import ChildProductCard from "../../components/UI/ChildProductCard";
import { getWishlistByUserId } from "../../api/wishlist.ts";

export default function ChildWishList() {
  const [showModal, setShowModal] = useState(false);
  const [wishList, setWishlist] = useState([]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    // Fetch wishlist data when the component mounts
    fetchWishlistData();
  }, [wishList]);

  const fetchWishlistData = async () => {
    try {
      // Fetch all wishlist data for the user ID
      const wishlistData = await getWishlistByUserId();
      setWishlist(wishlistData.data.item);
    } catch (error) {
      console.log("Failed to fetch wishlist data:", error);
    }
  };

  return (
    <div className="bg-white lg:pb-12">
      <div className="px-12 py-7 ">
        <p className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-4xl">
          나의 위시리스트 목록
        </p>
      </div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-6xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-8">
          {wishList.map((item) => {
            <ChildProductCard key={item.id} item={item} />;
          }
          )}
        </div>

        {/* 선물 등록 버튼 */}
        <div>
          <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
            <button
              type="button"
              className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              onClick={openModal}
            >
              선물 등록
            </button>
          </div>
          <div className="relative">
            {showModal && <LinkRegister onClose={closeModal} />}
          </div>
        </div>
      </div>
    </div>
  );
}
