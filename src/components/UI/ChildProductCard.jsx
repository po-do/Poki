import React, { useState } from "react";
import { deleteWishList } from "../../api/wishlist.ts";
import LinkUpdate from "../../components/Modal/LinkUpdateModal";

export default function ChildProductCard({item}) {
  const [showModal, setShowModal] = useState(false);
  console.log(item)
  const deleteList = async () => {
    try {
      await deleteWishList({itemid : item.id})
    } catch (error) {
      console.log("Failed to delete wishlist data:", error);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div
    key={item.id}
    className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
  >
    <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
      <img
        src={item.imageSrc}
        alt={item.imageAlt}
        className="h-full w-full object-cover object-center sm:h-full sm:w-full"
      />
    </div>
    <div className="flex flex-1 flex-col space-y-2 p-4">
      <h3 className="text-sm font-medium text-gray-900">
        <a href={item.href}>
          <span aria-hidden="true" className="absolute inset-0" />
          {item.name}
        </a>
      </h3>
      <p className="text-sm text-gray-500">{item.description}</p>
      <div className="flex flex-1 flex-col justify-end">
        <p className="text-sm italic text-gray-500">{item.options}</p>
        <p className="text-base font-medium text-gray-900">{item.price}</p>
      </div>
    </div>
    <div>
    <button className="px-2 py-2 bg-blue-500 text-white rounded" onClick={openModal}>수정</button>
    <button className="px-2 py-2 bg-blue-500 text-white rounded" onClick={openModal}>삭제</button>
    </div>
  </div>

  );    
}