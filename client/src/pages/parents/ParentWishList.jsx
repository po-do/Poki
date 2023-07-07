import React, { useState, useEffect } from "react";
import {
  getWishlistByUserId,
  updateWishlistPickStatus,
} from "../../api/wishlist.js";
import SuccessModal from "../../components/Modal/SuccessModal";
import { createBoard, getBoardStatus } from "../../api/board.js";
import FailModal from "../../components/Modal/FailModal";
export default function ChildWishList() {
  const [showModal, setShowModal] = useState(false);
  const [product, setproduct] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showFailModal, setShowFailModal] = useState(false);
  const [message, setMessage] = useState("");
  const openSuccessModal = async () => {
    setShowModal(true);
  };

  const closeSuccessModal = () => {
    setShowModal(false);
  };

  const openFailModal = async () => {
    setShowFailModal(true);
  };

  const closeFailModal = () => {
    setShowFailModal(false);
  };

  const handlePicked = async () => {
    try {
      // 과거에 선택된 선물이 있는 경우
      const wishlistData = await getWishlistByUserId();
      const PickedItem = wishlistData.data.item.filter(
        (wishItem) => wishItem.Given === "FALSE" && wishItem.Picked === "TRUE"
      );
      if (PickedItem[0]) {
        openFailModal();
        setMessage("이미 선택된 선물이 있습니다");
        return;
      }

      // 선택된 아이템이 있는 경우
      if (selectedItem) {
        openSuccessModal();
        const state = await getBoardStatus();
        // console.log(state);

        // 현재 보드가 존재하지 않는 경우
        if (!state.is_existence) {
          createBoard();
        }

        const params = {
          itemid: selectedItem,
        };
        await updateWishlistPickStatus(params);
        setSelectedItem(null);
      } else {
        openFailModal();
        setMessage("선물을 선택해 주세요");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleItemClick = (itemid) => {
    setSelectedItem(itemid);
  };

  useEffect(() => {
    const fetchWishlistData = async () => {
      try {
        const wishlistData = await getWishlistByUserId();
        const unPickedItem = wishlistData.data.item.filter(
          (wishItem) =>
            wishItem.Given === "FALSE" && wishItem.Picked === "FALSE"
        );

        setproduct(unPickedItem);
      } catch (error) {
        console.log("Failed to fetch wishlist data:", error);
      }
    };

    const intervalId = setInterval(fetchWishlistData, 1000); // 3초마다 fetchData 함수 호출

    return () => {
      clearInterval(intervalId); // 컴포넌트가 언마운트될 때 interval 정리
    };
  }, []);

  return (
    <div className="relative bg-white lg:pb-12">
      {/* 제목 */}
      <div className="px-12 py-7">
        <p className="mt-2 text-3xl font-semibold tracking-tight text-black sm:text-4xl">
          자녀의 위시리스트 목록
        </p>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-4 lg:max-w-6xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-8">
          {product.map((item) => (
            <div
              key={item.id}
              className={`flex ${
                selectedItem === item.id ? "bg-gray-200 rounded-2xl" : ""
              }`}
              onClick={() => handleItemClick(item.id)}
            >
              <div
                className={`group relative flex flex-col overflow-hidden border rounded-2xl shadow-xl border-gray-200${
                  selectedItem === item.id
                    ? "border-gray-500"
                    : "border-gray-300"
                }`}
              >
                <div>
                  <img
                    src={item.ProductImage}
                    alt={item.ProductName}
                    className={`h-full w-full object-cover object-center ${
                      selectedItem === item.id ? "grayscale" : ""
                    }`}
                  />
                </div>

                {/* 상품 이름 */}
                <div className="flex flex-1 flex-col space-y-2 p-4 border-t">
                  <h3 className="text-base text-gray-900 ">
                    {item.ProductName}
                  </h3>
                </div>

                {/* 링크 */}
                <div className="flex justify-center m-3">
                  <button
                    className="text-lg  w-full rounded-xl border border-transparent bg-indigo-600 px-4 py-2 text-white shadow-sm hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    onClick={() => (window.location.href = item.ProductLink)}
                  >
                    링크
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 선물 선택 버튼 */}
        <div>
          <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
            <button
              className="text-lg rounded-xl bg-indigo-600 px-4 py-2 text-white shadow-sm hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              onClick={handlePicked}
            >
              선물 선택
            </button>
            {showModal && (
              <SuccessModal
                closeModal={closeSuccessModal}
                message={"선물 선택 완료"}
              />
            )}
            {showFailModal && (
              <FailModal closeModal={closeFailModal} message={message} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
