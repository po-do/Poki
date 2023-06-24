import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import RecentMissionList from "../../components/Mission/ChildMissionList";
import { getBoardStatus, attachBoard } from "../../api/board.js";
import Grapes from "../../components/UI/Grapes";
import SuccessModal from "../../components/Modal/SuccessModal";
import FailModal from "../../components/Modal/FailModal";
import { getWishlistByUserId } from "../../api/wishlist.js";

export default function ChildMain() {
  const [grape, setGrape] = useState({});
  const [attachModal, setAttachModal] = useState(false);
  const [failAttachModal, setFailAttachModal] = useState(false);
  const [pickedName, setPickedName] = useState("");
  const [pickedImage, setPickedImage] = useState("");
  // Overlay Message
  const message = [
    "위시리스트에서 갖고 싶은 선물을 골라보세요",
    "선물 선택 후 포도 서비스가 시작됩니다",
  ];

  const openAttachModal = () => {
    setAttachModal(true);
  };

  const closeAttachModal = () => {
    setAttachModal(false);
  };

  const openFailAttachModal = () => {
    setFailAttachModal(true);
  };

  const closeFailAttachModal = () => {
    setFailAttachModal(false);
  };

  const boardQuery = useQuery(["boardState"], () => {
    pickedWishlistData();
    return getBoardStatus();
  });

  useEffect(() => {
    if (boardQuery.isSuccess) {
      const fetchedGrape = boardQuery?.data?.data?.grape;

      setGrape(fetchedGrape);
    }
  }, [grape, boardQuery.isSuccess, boardQuery.data]);

  // 안붙혀진 포도 추가
  async function addGrape() {
    const grapeStatus = await getBoardStatus();
    if (grapeStatus.data.grape.deattached_grapes === 0) {
      openFailAttachModal();
    } else {
      await attachBoard();
      openAttachModal();
      boardQuery.refetch();
    }
  }

  const pickedWishlistData = async () => {
    try {
      const wishlistData = await getWishlistByUserId();
      // 상품이 없는 경우 에러 처리
      if (wishlistData.data.item[0]) {
        const PickedItem = wishlistData.data.item.filter(
          (wishItem) => wishItem.Given === "FALSE" && wishItem.Picked === "TRUE"
        );
        setPickedName(PickedItem[0].ProductName);
        setPickedImage(PickedItem[0].ProductImage);
      }
    } catch (error) {
      console.log("Failed to fetch wishlist data:", error);
    }
  };

  return (
    <>
      {/* 배너 */}
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

      {/* 포도판 */}
      <div className="m-auto p-1 rounded-2xl md:border-4 md:w-6/12 max-[720px]:w-full">
        <Grapes GrapesCount={grape.attached_grapes} message={message} />
      </div>

      {/* 현재 포도알 및 관리 현황판 */}
      <div className="flex max-[720px]:flex-col p-6 rounded-2xl border-4 m-8 px-4 md:mx-44 sm:px-6 lg:px-8">
        {/* 가지고 있는 포도알 */}
        <div className="md:w-2/4 px-4 sm:px-6 lg:px-8">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            가지고 있는 포도알
          </h3>
          <div
            className="h-39 w-94 mt-3 
          mb-6 border rounded-md border-gray-200 p-1"
          >
            <div
              className={`flex flex-wrap w-full ${
                grape.deattached_grapes === 0 ? "h-12" : ""
              }`}
            >
              {Array.from({ length: grape.deattached_grapes }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 mr-1 mb-1 rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-200 via-purple-400 to-purple-800 flex-shrink-0"
                  />
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
        {/* 관리현황판 */}
        <div className="md:w-2/4 sm:px-6 max-[720px]:mt-6">
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

      {/* 등록된 미션 및 위시리스트 */}
      <div className="p-6 rounded-2xl border-4 m-8 px-4 md:mx-44 sm:px-6 lg:px-8 flex max-[720px]:flex-col">
        <div className="flex-1">
          <RecentMissionList />
        </div>
        <div className="mx-auto max-w-3xl flex-1 text-center max-[720px]:mt-4">
        <h4 className="text-lg font-bold">등록된 보상</h4>
        <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
          
          {pickedImage ? (
            <img
              src={pickedImage}
              alt={pickedName}
              className="object-cover object-center sm:h-full sm:w-full"
            />
          ) : (
            <button
            type="button"
            onClick={() => (window.location.href = '/format/child/wishlist')}
            className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          > 
          <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
                />
                </svg>
              <span className="mt-2 block text-sm font-semibold text-gray-900">
                원하는 선물을 선택해 보세요.
              </span>
            </button>
          )}
          </div>
        </div>
        <p className="mt-1">{pickedName}</p>
      </div>

      {/* Modal Area */}
      {attachModal && (
        <SuccessModal closeModal={closeAttachModal} message="등록완료" />
      )}
      {failAttachModal && (
        <FailModal
          closeModal={closeFailAttachModal}
          message="붙일 수 있는 포도알이 없습니다."
        />
      )}

    </>
  );
}
