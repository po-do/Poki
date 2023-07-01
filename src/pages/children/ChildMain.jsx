import React, { useEffect, useState } from "react";
import Grapes from "../../components/UI/ChildGrapes";
// recoil 사용
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/user.js";

export default function ChildMain() {
  const user = useRecoilValue(userState);

  // Overlay Message
  const message = [
    "위시리스트에서 갖고 싶은 선물을 골라보세요",
    "선물 선택 후 포도 서비스가 시작됩니다",
  ];

  return (
    <>
      <div className="relative bg-white py-1">
        {/* 배너 */}
        <div className="px-4 py-2">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {user.name}의 포도알 보드판
              </h2>
              <p className="mt-2 text-lg leading-8 text-gray-600">
                부모님이 주시는 미션을 수행해서 포도알 보드판을 완성해요~ 😀
              </p>
            </div>
          </div>
        </div>

        {/* 포도판 */}
        <div className="m-auto md:w-6/12 max-[720px]:w-full">
          <Grapes message={message} />
        </div>
      </div>
    </>
  );
}
