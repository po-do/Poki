import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MissionRegisteredGift from "../../components/Mission/MissionRegisteredGift";
import RecentMissionList from "../../components/Mission/RecentMissionList";
import { getBoardByUserId, attachBoard } from "../../api/board.ts";
import Grapes from "../../components/UI/Grapes";
export default function ChildMain() {

  const [grape, setGrape] = useState(null);
  const boardQuery = useQuery(["boardState"], () => {
    return getBoardByUserId();
  });

  useEffect(() => {
    if (boardQuery.isSuccess) {
      const fetchedGrape = boardQuery?.data?.data?.grape[0];
      setGrape(fetchedGrape);
    }
  }, [boardQuery.isSuccess, boardQuery.data]);

  async function addGrape() {
    const boardStatus = {
      grapeId: 2,
      //request: newStatus,
    };
    // console.log(boardStatus);
    await attachBoard(boardStatus);
  }

  return (
    <>
      <div className="flex">
        <div className="bg-red-100">
          <div className="flex bg-slate-200">
            <div>
              <img
                src="https://t1.daumcdn.net/cfile/tistory/991827345BF5441310"
                alt=""
              />
            </div>
            <div>
              <MissionRegisteredGift />
              {/* <p>남은포도송이 개수</p>
              <p>
                {grape?.deattached_grapes}/{grape?.total_grapes}
              </p> */}
              <p>붙일 수 있는 포도알 개수</p>
              <p>{grape?.deattached_grapes}</p>
              <p>붙인 포도알 개수</p>
              <p>{grape?.attached_grapes}</p>
              <p>목표 포도알 개수</p>
              <p>{grape?.blank}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              addGrape();
            }}
            className="block ml-2 rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            포도알 붙이기
          </button>
        </div>
        <div className="flex-1">
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
                  붙일 수 있는 포도알 개수
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
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex">
        <div className="flex-1 ">
          <RecentMissionList />
        </div>
        <div className="mx-auto max-w-3xl flex-1 text-center">
          <MissionRegisteredGift />
        </div>
      </div>
    </>
  );
}
