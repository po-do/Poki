import React from "react";
import { getWishlistByUserId } from "../../api/wishlist.js";
import { useState, useEffect } from "react";

// 부모와 연결된 자식의 위시리스트를 가져와서 그 위시리스트의 상태가 picked인 것을 가져와 이미지를 뿌려주면된다.
export default function MissionRegisteredGift({ message, link }) {
  const [pickedName, setPickedName] = useState("");
  const [pickedImage, setPickedImage] = useState("");

  useEffect(() => {
    // Fetch wishlist data when the component mounts
    pickedWishlistData();
  }, []);

  // picked가 된 위시리스트 보상
  const pickedWishlistData = async () => {
    try {
      const wishlistData = await getWishlistByUserId();
      // 상품이 없는 경우 에러 처리
      if (wishlistData.data.item[0]) {
        const PickedItem = wishlistData.data.item.filter(
          (wishItem) => wishItem.Given === "FALSE" && wishItem.Picked === "TRUE"
        );
        setPickedName(PickedItem[0].ProductName);
        setPickedImage(PickedItem[0].ProductImage);
      }
    } catch (error) {
      console.log("Failed to fetch wishlist data:", error);
    }
  };

  return (
    <>
      <h4 className="text-xl font-semibold">{message[0]}</h4>
      <div className="mb-4 flex-shrink-0 sm:mb-0">
        {pickedImage ? (
          <img
            src={pickedImage}
            alt={pickedName}
            className="object-cover object-center sm:h-[80%] sm:w-[80%] m-auto rounded-2xl"
          />
        ) : (
          <button
            type="button"
            onClick={() => (window.location.href = `${link}/wishlist`)}
            className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
              />
            </svg>
            <span className="mt-2 block text-lg text-gray-900">
              {message[1]}
            </span>
          </button>
        )}
      </div>
      <div>
        <p className="mt-1 text-base">{pickedName}</p>
      </div>
    </>
  );
}