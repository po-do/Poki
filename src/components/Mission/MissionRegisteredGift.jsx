import React from "react";
// import { getWishlistByUserId } from "../../api/wishlist.ts";

// 부모와 연결된 자식의 위시리스트를 가져와서 그 위시리스트의 상태가 picked인 것을 가져와 이미지를 뿌려주면된다.
export default function MissionRegisteredGift() {
  return (
    <>
      <h3 className="text-base font-semibold leading-6 text-gray-900 mb-2">
        등록된 보상
      </h3>
      <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white w-6/12 h-2/4 m-auto">
        <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
          <img
            src="https://thumbnail.10x10.co.kr/webimage/image/basic600/209/B002095704.jpg?cmd=thumb&w=200&h=200&fit=true&ws=false"
            // {product.imageSrc}
            alt="product"
            className="h-full w-full object-cover object-center sm:h-full sm:w-full"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-sm font-medium text-gray-900">
          <span aria-hidden="true" className="absolute inset-0 font-bold" />
          라이언 인형
        </h3>
        <p className="text-sm text-gray-500">
          카카오 인형
          {/* {product.description} */}
        </p>
        <div className="flex flex-1 flex-col justify-end">
          <p className="text-base font-medium text-gray-900">
            20000 원{/* {product.price} */}
          </p>
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
