import React, { useState } from "react";
import { updateWishList, deleteWishList } from "../../api/wishlist.ts";
export default function ParentProductCard({item}) {
  const [updateProductName,setUpdateProductName] = useState(null);
  const [updateProductLink,setUpdateProductLink] = useState(null);
  
  const updateList = async () => {
    console.log(item.id);
    try {
      const data = {
        itemid: item.id,
        request: {
          ProductName: updateProductName,
          ProductLink: updateProductLink
     }
      }
      await updateWishList(data);
    } catch (error) {
      console.log("Failed to update wishlist data:", error);
    }
  };

  const deleteList = async () => {
    try {
      await deleteWishList({itemid : item.id})
    } catch (error) {
      console.log("Failed to delete wishlist data:", error);
    }
  };
  return (
    <div className="max-w-[250px] rounded overflow-hidden shadow-lg md:w-1/2 lg:w-1/3 xl:w-1/4">
      <img
        src="https://thumbnail.10x10.co.kr/webimage/image/basic600/209/B002095704.jpg?cmd=thumb&w=200&h=200&fit=true&ws=false" //{item.ProductLink}
        alt=""
        className="w-full"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
        </p>
      </div>
      <div className="px-6 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #photo
        </span>

      </div>
    </div>

  );
}