import React from "react";
import { deleteWishList } from "../../api/wishlist";
export default function ChildProductCard({ item }) {
  const handleDeleteCard = async () => {
    const param = {
      itemid: item.id,
    };
    await deleteWishList(param);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <img
        src={item.ProductImage}
        alt={item.ProductName}
        className="h-full w-full object-cover object-center sm:h-full sm:w-full"
      />

      {/* 상품 이름 */}
      <div className="flex flex-1 flex-col space-y-2 p-4 ">
        <h3 className="text-lg text-gray-900">
          {item.ProductName}
        </h3>
      </div>

      {/* 삭제 */}
      <div className="flex justify-center m-3">
        <button
          className="w-full rounded-2xl border border-transparent bg-indigo-600 px-4 py-2 text-lg font-semibold text-white shadow-sm hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
          onClick={handleDeleteCard}
        >
          삭제
        </button>
      </div>
    </div>
  );
}
