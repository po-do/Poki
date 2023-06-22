import React, { useState } from "react";
import { deleteWishList } from "../../api/wishlist.js";

export default function ParentProductCard({ item, onItemClick }) {
  const [selectedItem, setSelectedItem] = useState(false);
  // console.log(item.id);
  // const handleDeleteCard = async () => {
  //   const param = {
  //     itemid: item.id
  //   }
  //   await deleteWishList(param);
  // }

  const handleClick = () => {
    onItemClick(item.id);
    setSelectedItem((prevState) => !prevState);
    console.log("ParentProductCard에서 클릭됨");
  };

  return (
    <>
      <div
        className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
        onClick={handleClick}
      >
        <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none sm:h-96 group-hover:opacity-30">
          <img
            src={item.ProductImage}
            alt={item.ProductName}
            className="h-full w-full object-cover object-center sm:h-full sm:w-full"
          />
        </div>
        <div className="flex flex-1 flex-col space-y-2 p-4 ">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 h-10">
            {item.ProductName}
          </h3>
          <input
            type="radio"
            name="selectItem"
            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 absolute top-1"
            checked={selectedItem}
          />
          <button
            className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            // onClick={item.ProductLink}
          >
            링크
          </button>
        </div>
      </div>
    </>
  );
}
