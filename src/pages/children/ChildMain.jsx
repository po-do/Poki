import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MissionRegisteredGift from "../../components/Mission/MissionRegisteredGift";
import RecentMissionList from "../../components/Mission/ChildMissionList";
import { getBoardStatus, attachBoard } from "../../api/board.ts";
import Grapes from "../../components/UI/Grapes";
import SuccessModal from "../../components/Modal/SuccessModal";

export default function ChildMain() {
  const [grape, setGrape] = useState({});
  const [attachModal, setAttachModal] = useState(false);


  const openAttachModal = () => {
    setAttachModal(true);
  };

  const closeAttachModal = () => {
    setAttachModal(false);
  };

  const boardQuery = useQuery(["boardState"], () => {
    return getBoardStatus();
  });

  useEffect(() => {
    if (boardQuery.isSuccess) {
      const fetchedGrape = boardQuery?.data?.data?.grape;
      setGrape(fetchedGrape);
    }
  }, [boardQuery.isSuccess, boardQuery.data]);

  async function addGrape() {
    await attachBoard();
    openAttachModal();
  }

  return (
    <>
      <div className="bg-white py-1 sm:py-1">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Child Main
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              아이들의 포도 관리 현황을 파악해보세요~
            </p>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <Grapes GrapesCount={grape.attached_grapes} />
        {/* <Grapes /> */}
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex">
        <div className="flex-1 px-4 sm:px-6 lg:px-8">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            가지고 있는 포도알
          </h3>
          <div className="h-2/4 m-2 border rounded-md border-gray-200 p-1 mr-6">
            <div className="flex">
              {Array.from({ length: grape.deattached_grapes }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 mr-1 rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-200 via-purple-400 to-purple-800"
                  ></div>
                )
              )}
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
        <div className="flex-1">
          <RecentMissionList />
        </div>
        <div className="mx-auto max-w-3xl flex-1 text-center">
          <MissionRegisteredGift />
        </div>
      </div>
      {/* Modal Area */}
      {attachModal && (
        <SuccessModal closeModal={closeAttachModal} message="등록완료" />
      )}
    </>
  );
}
