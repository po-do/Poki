import React from "react";
import { getWishlistByUserId } from "../../api/wishlist.js";
import { useState } from "react";
// 부모와 연결된 자식의 위시리스트를 가져와서 그 위시리스트의 상태가 picked인 것을 가져와 이미지를 뿌려주면된다.
export default function MissionRegisteredGift() {
  const [pickedWishList, setPickedWishList] = useState();
  getWishlistByUserId().then((item) => setPickedWishList(item));
  console.log(pickedWishList);
  const pickedItems = pickedWishList.item.filter(
    (item) => item.Picked === "TRUE"
  );
  console.log(pickedItems);
  return (
    <>

      <div className="sm:flex border">
        <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
          <img
            src="https://thumbnail.10x10.co.kr/webimage/image/basic600/209/B002095704.jpg?cmd=thumb&w=200&h=200&fit=true&ws=false"
            // {product.imageSrc}
            alt="product"
            className="h-full w-full object-cover object-center sm:h-full sm:w-full"
          />
        </div>
        <div>
          <h4 className="text-lg font-bold">등록된 보상</h4>
          <p className="mt-1">라이언 인형</p>
          <p className="mt-1">20000 원</p>
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
