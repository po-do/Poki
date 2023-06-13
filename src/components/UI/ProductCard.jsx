import React from "react";
import { updateWishList,deleteWishList } from "../../api/wishlist.ts";
export default function ProductCard({item}) {


  const updateList = async () => {
    try {
      const data = {
      }
      await updateWishList({data})
    } catch (error) {
      console.log("Failed to update wishlist data:", error);
    }
  };

  const deleteList = async () => {
    try {
      // await deleteWishList({itemid : itemid})
    } catch (error) {
      console.log("Failed to delete wishlist data:", error);
    }
  };
  
  return (
    // <div>
    //   {/* {item} */}
    //   {{item} && <div>Hello</div>}
    // </div>
    <div className="max-w-[250px] rounded overflow-hidden shadow-lg">
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
          #photography
        </span>
      </div>
      <button className="px-2 py-2 bg-blue-500 text-white rounded" onClick={updateList}>수정</button>
      <button className="px-2 py-2 bg-blue-500 text-white rounded" onClick={deleteList}>삭제</button>
    </div>

  );
}
