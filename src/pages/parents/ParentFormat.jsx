import { Fragment, useState, useEffect, useCallback, useRef } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  Cog6ToothIcon,
  DocumentCheckIcon,
  HomeIcon,
  GiftIcon,
  XMarkIcon,
  VideoCameraIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { Outlet } from "react-router-dom";
import { createUserCode } from "../../api/auth.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getConnectedUser } from "../../api/auth.js";

// ======================================
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { userState } from "../../recoil/user";
import { socket } from "../../App";
import grapeLogo from "../../icons/mstile-310x310.png";
import PodoChar from "../../icons/PodoChar.png";

import { useNotification } from "../../hooks/useNotification.js";

const queryClient = new QueryClient();

const navigation = [
  { name: "홈", href: "/format/parent", icon: HomeIcon, current: false },
  {
    name: "미션",
    href: "/format/parent/mission",
    icon: DocumentCheckIcon,
    current: false,
  },
  {
    name: "캘린더",
    href: "/format/parent/calendar",
    icon: CalendarIcon,
    current: false,
  },
  {
    name: "위시리스트",
    href: "/format/parent/wishlist",
    icon: GiftIcon,
    current: false,
  },
  {
    name: "화상통화",
    href: "/format/parent/video",
    icon: VideoCameraIcon,
    current: false,
  },
];

// const teams = [
//   { id: 1, name: "아이1", href: "#", initial: "C1", current: false },
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ParentFormat() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [issuedData, setIssuedData] = useState("");
  const [isConnect, setIsConnect] = useState("");

  // 코드 유효 시간
  const [timer, setTimer] = useState(180000);
  const [minute, setMinute] = useState(3);
  const [second, setSecond] = useState(0);
  const [running, setRunning] = useState(false);
  const [codeText, setCodeText] = useState("발급");
  const [realTime, setRealTime] = useState(false);

  // 코드 발급
  const isConnected = async () => {
    try {
      const state = await getConnectedUser();
      // console.log(state);
      setIsConnect(state.data.is_connected);
    } catch (error) {
      console.log("Failed to get connected status:", error);
    }
  };

  // FCM 알림
  useNotification();

  // 코드 발급 타이머
  useEffect(() => {
    // 현재 연결 상태
    isConnected();

    let tempMinute = parseInt(timer / 1000 / 60).toString();
    let tempSecond = parseInt((timer / 1000) % 60).toString();
    if (tempSecond.length === 1) tempSecond = "0" + tempSecond;
    setMinute(tempMinute);
    setSecond(tempSecond);

    // 0초가 지나면 초기화
    if (timer <= 0) {
      setCodeText("재발급");
      setRealTime(false);
      stopTimer();
    }
  }, [timer]);

  //
  useEffect(() => {
    let intervalId;
    // 작동하며, 부모와 연결되어 있지 않다면 타이머 작동
    if (running && !isConnect) {
      intervalId = setInterval(() => {
        setTimer((time) => time - 1000);
      }, 1000);
    } else {
      clearInterval(intervalId); // Clear the interval if not running
    }

    return () => clearInterval(intervalId);
  }, [running]);

  // 타이머 시작
  const startTimer = () => {
    setRunning(true);
    setRealTime(true);
  };
  //타이머 중단
  const stopTimer = () => {
    setRunning(false);
  };

  // 재 발급
  const requestAgain = async () => {
    setTimer(180000); // Reset the timer to 3 minutes
    startTimer(); // Start the timer
  };

  // const [issuCodeModal, setIssuCodeModal] = useState(false);

  // const openIssuCodeModal = () => {
  //   setIssuCodeModal(true);
  // };

  // const closeIssuCodeModal = () => {
  //   setIssuCodeModal(false);
  // };

  const codeIssu = async () => {
    const newData = await createUserCode();
    setIssuedData(newData.data.connection_code);
    // 코드 발급
    requestAgain();
  };

  // ==================================================================
  const navigate = useNavigate();

  const user = useRecoilValue(userState); // Recoil에서 사용자 정보 받아오기

  // 채팅방이 없을 시 채팅 아이콘 클릭시 이 함수 호출
  const onCreateRoom = useCallback(() => {
    const roomName = `${user.user_id}'s_room`;
    socket.emit("create-room", { roomName, user }, (response) => {
      if (response.number === 2) {
        socket.emit("join-room", response.payload, () => {
          // console.log("join-room");
          // console.log(response.payload);
          navigate(`/chat/${response.payload}`);
        }); // 이미 채팅방이 존재할 경우 바로 입장
      }
      if (response.number === 0) return alert(response.payload);
      navigate(`/chat/${response.payload}`);
    });
  }, [navigate]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div>
          {/* 접히는 사이드바 */}
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-50 lg:hidden"
              onClose={setSidebarOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-900/80" />
              </Transition.Child>

              <div className="fixed inset-0 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                        <button
                          type="button"
                          className="-m-2.5 p-2.5"
                          onClick={() => setSidebarOpen(false)}
                        >
                          <span className="sr-only">Close sidebar</span>
                          <XMarkIcon
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </Transition.Child>
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
                      <div className="flex h-16 shrink-0 items-center">
                        <img
                          className="h-12 w-auto"
                          src={grapeLogo}
                          alt="Your Company"
                        />
                        <p className="font-semibold text-white text-2xl ml-2 mt-1">
                          Poki
                        </p>
                      </div>
                      <nav className="flex flex-1 flex-col">
                        <ul className="flex flex-1 flex-col gap-y-7">
                          <li>
                            <ul className="-mx-2 space-y-1">
                              {navigation.map((item) => (
                                <li key={item.name}>
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      item.current
                                        ? "bg-indigo-700 text-white"
                                        : "text-indigo-200 hover:text-white hover:bg-indigo-800",
                                      "group flex gap-x-3 rounded-md p-2 text-xl leading-6 font-semibold"
                                    )}
                                  >
                                    <item.icon
                                      className={classNames(
                                        item.current
                                          ? "text-white"
                                          : "text-indigo-200 group-hover:text-white",
                                        "h-6 w-6 shrink-0"
                                      )}
                                      aria-hidden="true"
                                    />
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                              <li key="채팅">
                                <button
                                  onClick={onCreateRoom}
                                  className={classNames(
                                    false
                                      ? "bg-indigo-700 text-white"
                                      : "text-indigo-200 hover:text-white hover:bg-indigo-800",
                                    "group flex gap-x-3 rounded-md p-2 text-lg leading-6 font-semibold"
                                  )}
                                >
                                  <ChatBubbleLeftRightIcon
                                    className={classNames(
                                      false
                                        ? "text-white"
                                        : "text-indigo-200 group-hover:text-white",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  채팅
                                </button>
                              </li>
                            </ul>
                          </li>
                          {/* <li>
                            <div className="text-xs font-semibold leading-6 text-indigo-200">
                              아이 목록
                            </div>
                            <ul className="-mx-2 mt-2 space-y-1">
                              {teams.map((team) => (
                                <li key={team.name}>
                                  <a
                                    href={team.href}
                                    className={classNames(
                                      team.current
                                        ? "bg-indigo-700 text-white"
                                        : "text-indigo-200 hover:text-white hover:bg-indigo-700",
                                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                    )}
                                  >
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-semibold text-white">
                                      {team.initial}
                                    </span>
                                    <span className="truncate">
                                      {team.name}
                                    </span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </li> */}

                          {/* 코드 발급 부분 */}
                          {!isConnect ? (
                            <>
                              <li className="mt-auto">
                                <div className="-mx-2 flex gap-x-3 rounded-md p-2 text-lg font-semibold leading-6 text-indigo-200">
                                  <Cog6ToothIcon
                                    className="h-6 w-6 shrink-0 text-indigo-200"
                                    aria-hidden="true"
                                  />
                                  코드 발급
                                </div>
                                <div className="w-full max-w-md lg:col-span-5 lg:pt-2">
                                  <div className="flex gap-x-4">
                                    <input
                                      id="code"
                                      name="code"
                                      type="text"
                                      value={issuedData}
                                      readOnly
                                      className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                      placeholder="코드 생성"
                                    />
                                    <button
                                      type="submit"
                                      className={`flex-none rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                                        realTime
                                          ? "text-white cursor-not-allowed"
                                          : "bg-indigo-500 text-white"
                                      }`}
                                      onClick={codeIssu}
                                      disabled={realTime}
                                    >
                                      {realTime
                                        ? `${minute} : ${second}`
                                        : `${codeText}`}
                                    </button>
                                  </div>
                                </div>
                              </li>
                            </>
                          ) : (
                            <li className="mt-auto">
                              <div>
                                <div className="-mx-2 flex gap-x-3 rounded-md p-2 text-lg font-semibold leading-6 text-indigo-200">
                                  <Cog6ToothIcon
                                    className="h-6 w-6 shrink-0 text-indigo-200"
                                    aria-hidden="true"
                                  />
                                  코드 등록 완료
                                </div>
                              </div>
                            </li>
                          )}
                        </ul>
                      </nav>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          {/* 기본 사이드바 */}
          {/* Static sidebar for desktop */}
          <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
              <div className="flex h-16 shrink-0 items-center">
                <img
                  className="h-11 w-auto"
                  src="https://cdn-icons-png.flaticon.com/512/2431/2431996.png"
                  alt="Poki"
                />
                <div className=" text-white group flex gap-x-3 rounded-md p-2 text-3xl leading-6 font-semibold">
                  Poki
                </div>
              </div>
              <nav className="flex flex-1 flex-col">
                <ul className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-indigo-700 text-white"
                                : "text-indigo-200 hover:text-white hover:bg-indigo-800",
                              "group flex gap-x-3 rounded-md p-2 text-lg leading-6 font-semibold"
                            )}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-white"
                                  : "text-indigo-200 group-hover:text-white",
                                "h-6 w-6 shrink-0"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        </li>
                      ))}
                      <li key="채팅">
                        <button
                          onClick={onCreateRoom}
                          className={classNames(
                            false
                              ? "bg-indigo-700 text-white"
                              : "text-indigo-200 hover:text-white hover:bg-indigo-800",
                            "group flex gap-x-3 rounded-md p-2 text-lg leading-6 font-semibold"
                          )}
                        >
                          <ChatBubbleLeftRightIcon
                            className={classNames(
                              false
                                ? "text-white"
                                : "text-indigo-200 group-hover:text-white",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          채팅
                        </button>
                      </li>
                    </ul>
                  </li>
                  {/* <li>
                    <div className="text-xl font-semibold leading-6 text-indigo-200">
                      아이 목록
                    </div>
                    <ul className="-mx-2 mt-2 space-y-1">
                      {teams.map((team) => (
                        <li key={team.name}>
                          <a
                            href={team.href}
                            className={classNames(
                              team.current
                                ? "bg-indigo-700 text-white"
                                : "text-indigo-200 hover:text-white hover:bg-indigo-700",
                              "group flex gap-x-3 rounded-md p-2 leading-6 font-semibold"
                            )}
                          >
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-semibold text-white">
                              {team.initial}
                            </span>
                            <span className="truncate">{team.name}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li> */}

                  {/* 코드 발급 부분 */}
                  {!isConnect ? (
                    <>
                      <li className="mt-auto">
                        <div className="-mx-2 flex gap-x-3 rounded-md p-2 text-lg font-semibold leading-6 text-indigo-200">
                          <Cog6ToothIcon
                            className="h-6 w-6 shrink-0 text-indigo-200"
                            aria-hidden="true"
                          />
                          코드 발급
                        </div>
                        <div className="w-full max-w-md lg:col-span-5 lg:pt-2">
                          <div className="flex gap-x-4">
                            <input
                              id="code"
                              name="code"
                              type="text"
                              value={issuedData}
                              readOnly
                              className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                              placeholder="코드 생성"
                            />
                            <button
                              type="submit"
                              className={`flex-none rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                                realTime
                                  ? "text-white cursor-not-allowed"
                                  : "bg-indigo-500 text-white"
                              }`}
                              onClick={codeIssu}
                              disabled={realTime}
                            >
                              {realTime
                                ? `${minute} : ${second}`
                                : `${codeText}`}
                            </button>
                          </div>
                        </div>
                      </li>
                    </>
                  ) : (
                    <li className="mt-auto">
                      <div>
                        <div className="-mx-2 flex gap-x-3 rounded-md p-2 text-lg font-semibold leading-6 text-indigo-200">
                          <Cog6ToothIcon
                            className="h-6 w-6 shrink-0 text-indigo-200"
                            aria-hidden="true"
                          />
                          코드 등록 완료
                        </div>
                      </div>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </div>

          {/* 햄버거 버튼 */}
          <div className="lg:pl-72">
            <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Separator */}
              <div
                className="h-6 w-px bg-gray-900/10 lg:hidden"
                aria-hidden="true"
              />

              <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <div className="relative flex flex-1"></div>
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                  {/* <button
                    type="button"
                    className="flex m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                  >
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                    </span>
                  </button> */}

                  {/* Separator */}
                  {/* <div
                    className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                    aria-hidden="true"
                  /> */}

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative flex">
                    <a
                      className="my-auto mr-4 rounded-md border border-transparent bg-indigo-600 px-2 py-1 text-sm text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                      href="/"
                    >
                      로그아웃
                    </a>
                    <Menu.Button className="-m-1.5 flex items-center p-1.5">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="rounded-full w-11 h-11 border-2 rounded-2"
                        src={PodoChar}
                        alt=""
                      />
                    </Menu.Button>
                  </Menu>
                </div>
              </div>
            </div>

            {/* 메인 */}
            <main>
              <Outlet />
            </main>
          </div>
        </div>

        {/* Modal Area */}
        {/* {issuCodeModal && (
          <SuccessModal
            closeModal={closeIssuCodeModal}
            message="코드발급 완료"
            className="invisible"
          />
        )} */}
      </QueryClientProvider>
    </>
  );
}
