import { React, useEffect, useState } from "react";
import MissionRegisteredGift from "../../components/Mission/MissionRegisteredGift";
import { deleteBoard, getBoardStatus } from "../../api/board.js";
import Grapes from "../../components/UI/Grapes";
import { EventSourcePolyfill } from "event-source-polyfill";
import { getAccessToken } from "../../api/auth";
import {
  getWishlistByUserId,
  updateWishlistGivenStatus,
} from "../../api/wishlist";

export default function ParentMain() {
  const [grape, setGrape] = useState({});

  const handleConnect = () => {
    const accessToken = getAccessToken();

    const sse = new EventSourcePolyfill(
      `${process.env.REACT_APP_API_URL}/board/grape/sse/user`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        heartbeatTimeout: 180000,
      }
    );

    sse.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setGrape(data.grape);
    };

    sse.addEventListener("connect", (e) => {
      const { data: receivedData } = e;
      // console.log(receivedData);
    });
  };
  const message = [
    "1. 위시리스트에서 자녀의 위시리스트를 확인하세요",
    "2. 자녀에게 줄 선물을 선택 후 포도 서비스가 시작됩니다",
    "3. 아이가 포도를 완성하면 보상으로 선물을 주세요"
  ];

  // 31모으면 눌러서 이벤트 발생해야함 아래꺼
  const updateGiven = async () => {
    if (grape.attached_grapes === 31) {
      const x = await getWishlistByUserId();
      const pickedProduct = x.data.item.filter(
        (item) => item.Picked === "TRUE" && item.Given === "FALSE"
      );
      const pickedItemId = pickedProduct[0].id;
      const params = {
        itemid: pickedItemId,
      };
      await deleteBoard();
      await updateWishlistGivenStatus(params);

      await getBoardStatus();
      window.location.reload();
    }
  };

  useEffect(() => {
    handleConnect();
  }, []);

  return (
    <>
      <div className="relative bg-white py-1 sm:py-1">
        {/* 배너 */}
        <div className="bg-white px-12 py-7">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                자녀의 포도알
              </h2>
              <p className="mt-2 text-lg leading-8 text-gray-600">
                아이들의 포도 관리 현황을 파악해보세요~ 🥰
              </p>
            </div>
          </div>
        </div>

        {/* 포도판 */}
        <div className="m-auto p-1 md:w-6/12 max-[720px]:w-full">
          <Grapes GrapesCount={grape.attached_grapes} message={message} />
          {/* <Grapes /> */}
        </div>

        {/* 현재 포도알 및 관리 현황판 */}
        <div className="p-6 rounded-2xl border-4 m-8 px-4 md:mx-28 sm:px-6 lg:px-8 flex max-[720px]:flex-col">
          {/* 관리현황판 */}
          <div className="md:w-2/4 sm:px-6 max-[720px]:mt-6">
            <div className="px-4 sm:px-0">
              <h3 className="text-xl font-semibold leading-7 text-gray-900 mb-4 text-center">
                포도알 관리
              </h3>
              <p className="mt-1 max-w-2xl text-base leading-6 text-gray-500">
                현재 자녀의 포도알 정보를 확인할 수 있습니다.
              </p>
            </div>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="whitespace-nowrap md:text-base font-semibold leading-6 text-gray-900">
                    자녀 포도알
                  </dt>
                  <dd className="mt-1 text-center text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {grape?.deattached_grapes}개
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <div className="whitespace-nowrap text-base font-semibold leading-6 text-gray-900">
                    붙인 포도알
                  </div>
                  <div className="mt-1 text-base text-center leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {grape?.attached_grapes}개 / {grape?.blank}개
                  </div>
                </div>
              </dl>
            </div>
          </div>

          {/* 등록된 보상 부분 */}
          <div className="mx-auto max-w-3xl flex-1 text-center max-[720px]:mt-4">
            <MissionRegisteredGift
              message={["등록된 보상", "보상을 선택해 주세요"]}
              link={`parent`}
            />
            {(grape?.attached_grapes === 31 ? true : false) && (
              <button
                onClick={updateGiven}
                className="w-25 mt-4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                선물지급완료
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
