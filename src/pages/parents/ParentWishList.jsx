import React, { useState, useEffect } from "react";
import ParentProductCard from "../parents/ParentProductCard";
import { getWishlistByUserId, updateWishlistPickStatus } from "../../api/wishlist.js";
import SuccessModal from "../../components/Modal/SuccessModal";
import FailModal from "../../components/Modal/FailModal";
import { createBoard, getBoardStatus } from "../../api/board.js";

export default function ChildWishList() {
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showFailModal, setShowFailModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handlePicked = async () => {
    if (selectedItem) {
      openModal();
      const state = await getBoardStatus();
      if (!state.is_existence) {
        createBoard();
      }

      const params = {
        itemid: selectedItem
      };

      await updateWishlistPickStatus(params);
      setSelectedItem(null);
    } else {
      setShowFailModal(true);
    }
  };

  const handleItemClick = (itemid) => {
    setSelectedItem(itemid);
  };

  useEffect(() => {
    fetchWishlistData();
  }, [selectedItem, product]);

  const fetchWishlistData = async () => {
    try {
      const wishlistData = await getWishlistByUserId();
      const unPickedItem = wishlistData.data.item.filter(
        (wishItem) => wishItem.Given === "FALSE" && wishItem.Picked === "FALSE"
      );
      setProduct(unPickedItem);
    } catch (error) {
      console.log("Failed to fetch wishlist data:", error);
    }
  };

  return (
    <div className="bg-white lg:pb-12">
      <div className="px-12 py-7">
        <p className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-4xl">
          아이의 위시리스트 목록
        </p>
      </div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-6xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-8">
          {product.map((item) => (
            <ParentProductCard
              key={item.id}
              item={item}
              onItemClick={handleItemClick}
            />
          ))}
        </div>

        {/* 선물 선택 버튼 */}
        <div>
          <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
            <button
              type="submit"
              className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              onClick={handlePicked}
            >
              선물 선택
            </button>
            {showModal && selectedItem ? (
              <SuccessModal closeModal={closeModal} message={"선물 선택 완료"} />
            ) : null}
            {showFailModal ? (
              <FailModal closeModal={() => setShowFailModal(false)} message={"선물을 선택해주세요."} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
