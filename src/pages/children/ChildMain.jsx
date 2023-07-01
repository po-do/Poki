import React, { useEffect, useState } from "react";
import Grapes from "../../components/UI/ChildGrapes";
// recoil 사용
import { getConnectedUserId } from "../../api/auth.js";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/user.js";
import { CodeConnectModal } from "../../components/Modal/CodeConnectModal";

export default function ChildMain() {
  const user = useRecoilValue(userState);
  const [condition, setCondition] = useState(false);

  useEffect(() => {
    const navigationItems = document.querySelectorAll(
      ".navigation-bar .list-items .item"
    );
    const navigationPointer = document.querySelector(
      ".navigation-bar .pointer"
    );

    const handleClick = (e) => {
      e.preventDefault();

      navigationItems.forEach((item) => item.classList.remove("active"));
      e.currentTarget.classList.add("active");

      const parentWidth = e.currentTarget.parentElement.clientWidth;
      const leftPercent =
        (parentWidth / navigationItems.length) *
        Array.from(navigationItems).indexOf(e.currentTarget);
      navigationPointer.style.left = `${leftPercent}px`;
    };

    navigationItems.forEach((item) => {
      item.addEventListener("click", handleClick);
    });

    return () => {
      navigationItems.forEach((item) => {
        item.removeEventListener("click", handleClick);
      });
    };
  }, []);

  // Overlay Message
  const message = [
    "위시리스트에서 갖고 싶은 선물을 골라보세요",
    "선물 선택 후 포도 서비스가 시작됩니다",
  ];

  useEffect(() => {
    const fetchUserCondition = async () => {
      const result = await getConnectedUserId();
      setCondition(result.data.is_connected);
    };
    fetchUserCondition();
    console.log(condition);
  }, []);

  return (
    <>
      {condition === false && <CodeConnectModal closeModal={setCondition} />}
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

        {/* 버튼 */}
        {/* 홈, 미션, 위시리스트, 채팅, 화상채팅 */}
        <nav class="navigation-bar">
          <ul class="list-items">
            <span class="pointer"></span>
            <li class="item active">
              <a class="link" href="">
                <i class="fas fa-home fa-2x"> </i>
              </a>
            </li>
            <li class="item">
              <a class="link" href="#">
                <i class="fas fa-search fa-2x"> </i>
              </a>
            </li>
            <li class="item">
              <a class="link" href="#">
                <i class="fas fa-heart fa-2x"> </i>
              </a>
            </li>
            <li class="item">
              <a class="link" href="#">
                <i class="fas fa-bell fa-2x"> </i>
              </a>
            </li>
            <li class="item">
              <a class="link" href="#">
                <i class="fas fa-user fa-2x"> </i>
              </a>
            </li>
          </ul>
        </nav>

        {/* 현재 포도알 및 관리 현황판 */}
        {/* <div className="flex max-[720px]:flex-col p-6 rounded-2xl border-4 m-8 px-4 md:mx-44 sm:px-6 lg:px-8">
          주석 - 가지고 있는 포도알
          <div className="md:w-2/4 px-4 sm:px-6 lg:px-8">
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              가지고 있는 포도알
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              현재 가지고 있는
            </p>
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

          주석 - 관리현황판
          <div className="md:w-2/4 sm:px-6 max-[720px]:mt-6">
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                포도알 관리 현황판
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                현재 가지고 있는 포도알 정보를 확인할 수 있습니다.
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
        </div> */}


        {/* 등록된 미션 및 위시리스트 */}
        {/* <div className="p-6 rounded-2xl border-4 m-8 px-4 md:mx-44 sm:px-6 lg:px-8 flex max-[720px]:flex-col">
          <div className="flex-1">
            <RecentMissionList />
          </div>

          등록된 보상 부분
          <div className="mx-auto max-w-3xl flex-1 text-center max-[720px]:mt-4">
            <MissionRegisteredGift
              message={["원하는 선물", "원하는 선물을 선택해 주세요"]}
              link ={`child`}
            />
          </div>
        </div> */}


        {/* Modal Area */}
        {/* {attachModal && (
          <SuccessModal closeModal={closeAttachModal} message="등록완료" />
        )}
        {failAttachModal && (
          <FailModal
            closeModal={closeFailAttachModal}
            message="붙일 수 있는 포도알이 없습니다."
          />
        )} */}
      </div>
      {/* 만약 코드등록이 되어있지 않다면 코드를 등록하라는 모달이 기본으로 나오게 만들기 -> 유저상태조회후 코드가 없으면 출력 */}
    </>
  );
}
