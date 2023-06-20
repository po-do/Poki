import React from "react";
import { deleteWishList } from "../../api/wishlist.js";

export default function ChildProductCard({item}) {
  // console.log(item.id);
  const handleDeleteCard = async () => {
    const param = {
      itemid: item.id
    }
    await deleteWishList(param);
  }

  return (
    <div
    className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
  >
    <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
      <img
        src={item.ProductImage}
        alt={item.ProductName}
        className="h-full w-full object-cover object-center sm:h-full sm:w-full"
      />
    </div>
    <div className="flex flex-1 flex-col space-y-2 p-4 ">
      <h3 className="text-sm font-medium text-gray-900 ">
          {item.ProductName}
      </h3>
      <button
      className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
      onClick={handleDeleteCard}
      >
        삭제
      </button>
    </div>

  </div>

  );
}