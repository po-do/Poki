import React from "react";
// import { getWishlistByUserId } from "../../api/wishlist.ts";

// 부모와 연결된 자식의 위시리스트를 가져와서 그 위시리스트의 상태가 picked인 것을 가져와 이미지를 뿌려주면된다.
export default function MissionRegisteredGift() {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">등록된 보상</h3>
      <img
        src="https://thumbnail.10x10.co.kr/webimage/image/basic600/209/B002095704.jpg?cmd=thumb&w=200&h=200&fit=true&ws=false"
        alt=""
      />
    </div>
  );
}

// // 유저 아이디별 위시리스트 조회(전부)
// export async function getWishlistByUserId(params: GetWishlistByUserIdParams) {
//   const response = await client.get(`/wishlist/user/${params.userid}`);
//   return response.data;
// }
