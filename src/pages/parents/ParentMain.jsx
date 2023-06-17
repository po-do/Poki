import { React, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MissionRegisteredGift from "../../components/Mission/MissionRegisteredGift";
import { getBoardStatus } from "../../api/board.ts";
import Grapes from "../../components/UI/Grapes";

export default function ChildMain() {
  const [grape, setGrape] = useState({});
  const boardQuery = useQuery(["boardState"], () => {
    return getBoardStatus();
  });

  useEffect(() => {
    if (boardQuery.isSuccess) {
      const fetchedGrape = boardQuery?.data?.data?.grape;
      setGrape(fetchedGrape);
    }
  }, [boardQuery.isSuccess, boardQuery.data]);

  return (
    <>
      <div className="bg-white py-1 sm:py-1">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Parent Main
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              아이들의 포도 관리 현황을 파악해보세요~
            </p>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="mb-4 flex-1 border-r border-gray-200">
          <Grapes GrapesCount={grape.attached_grapes} />
          {/* <Grapes /> */}
        </div>
        <div className="flex-1">
          <div className="ml-10 mr-10 border-b border-gray-200">
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                포도알 관리 현황판
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                Personal details and application.
              </p>
            </div>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    자녀 포도알
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {grape?.deattached_grapes}개
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    붙인 포도알 개수
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {grape?.attached_grapes}개 / {grape?.blank}개
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
            <div className="mx-auto max-w-3xl text-center mt-4">
              <MissionRegisteredGift />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
