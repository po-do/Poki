import React from "react";
import { getWishlistByUserId } from "../../api/wishlist.js";
import { useState, useEffect } from "react";
import { GiftIcon } from "@heroicons/react/24/outline";

// 부모와 연결된 자식의 위시리스트를 가져와서 그 위시리스트의 상태가 picked인 것을 가져와 이미지를 뿌려주면된다.
export default function MissionRegisteredGift() {
  const [pickedName, setPickedName] = useState("");
  const [pickedImage, setPickedImage] = useState("");


  useEffect(() => {
    // Fetch wishlist data when the component mounts
    pickedWishlistData();
  }, []);

  const pickedWishlistData = async () => {
    try {
      const wishlistData = await getWishlistByUserId();
      const PickedItem = wishlistData.data.item.filter(
        (wishItem) => wishItem.Given === "FALSE" && wishItem.Picked === "TRUE"
      );
      setPickedName(PickedItem[0].ProductName);
      setPickedImage(PickedItem[0].ProductImage);
    } catch (error) {
      console.log("Failed to fetch wishlist data:", error);
    }
  };

  return (
    <>
      <div className="m-4 border">
        <h4 className="text-lg font-bold">등록된 보상</h4>
        <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
          {pickedImage ? (
            <img
              src={pickedImage}
              alt={pickedName}
              className="object-cover object-center sm:h-full sm:w-full"
            />
          ) : (
            <button
              type="button"
              className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <GiftIcon className="text-gray-400 h-12 w-30 text-center"/>
              <span className="mt-2 block text-sm font-semibold text-gray-900">보상을 선택해 주세요.</span>
            </button>
          )}
        </div>
        <div>
          <p className="mt-1">{pickedName}</p>
        </div>
      </div>
    </>
  );
}

// // 유저 아이디별 위시리스트 조회(전부)
// export async function getWishlistByUserId(params: GetWishlistByUserIdParams) {
//   const response = await client.get(`/wishlist/user/${params.userid}`);
//   return response.data;
// }
