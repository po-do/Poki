import React from "react";
import { deleteWishList } from "../../api/wishlist.ts";

export default function ProductCard({item}) {
  console.log("item",item);

  const handleCard = async (itemid) => {
    const param = {
      itemid: itemid
    }
    await deleteWishList(param);
  }

  return (
    <div
    key={item.id}
    className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
  >
    <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
      <a href={item.ProductLink}>
        <img
          src={item.ProductImg}
          alt={item.ProductName}
          className="h-full w-full object-cover object-center sm:h-full sm:w-full"
        />
      </a>
    </div>
    <div className="flex flex-1 flex-col space-y-2 p-4">
      <h3 className="text-sm font-medium text-gray-900">
          <span aria-hidden="true" className="absolute inset-0" />
          {item.ProductName}
      </h3>
      {/* <p className="text-sm text-gray-500">{item.description}</p>
      <div className="flex flex-1 flex-col justify-end">
        <p className="text-sm italic text-gray-500">{item.options}</p>
        <p className="text-base font-medium text-gray-900">{item.price}</p>
      </div> */}
      <button
        className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
        onClick={handleCard(item.id)}
      >
        삭제
      </button>
    </div>
  </div>

  );
}