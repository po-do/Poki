import { Fragment, useState, useCallback, useEffect } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  Cog6ToothIcon,
  HomeIcon,
  XMarkIcon,
  GiftIcon,
  VideoCameraIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { connectUserCode, getConnectedUser } from "../../api/auth.js";
// import SuccessModal from "../../components/Modal/SuccessModal";
import FailModal from "../../components/Modal/FailModal";
import grapeLogo from "../../icons/mstile-310x310.png";
import PodoChar from "../../icons/PodoChar.png";

// ======================================
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { userState } from "../../recoil/user";
import { socket } from "../../App";

import { useNotification } from "../../hooks/useNotification.js";

const queryClient = new QueryClient();

const navigation = [
  { name: "홈", href: "/format/child", icon: HomeIcon, current: false },
  {
    name: "위시리스트",
    href: "/format/child/wishlist",
    icon: GiftIcon,
    current: false,
  },
  {
    name: "화상통화",
    href: "/format/child/video",
    icon: VideoCameraIcon,
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ChildFormat() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inputData, setInputData] = useState("");
  const [inputReadOnly, setInputReadOnly] = useState(false);
  // const [registCodeModal, setRegistCodeModal] = useState(false);
  const [registCodeFailModal, setRegistCodeFailModal] = useState(false);
  const [failModal, setFailModal] = useState(false);

  useNotification();

  // const openRegistCodeModal = () => {
  //   setRegistCodeModal(true);
  // };

  // const closeRegistCodeModal = () => {
  //   setRegistCodeModal(false);
  // };

  const openFailModal = () => {
    setFailModal(true);
  };

  const closeFailModal = () => {
    setFailModal(false);
  };

  const openCodeFailModal = () => {
    setRegistCodeFailModal(true);
  };

  const closeCodeFailModal = () => {
    setRegistCodeFailModal(false);
  };

  // recoil
  const user = useRecoilValue(userState);

  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const handleRegistCode = async () => {
    if (inputData !== "") {
      const params = {
        request: {
          child_id: user.user_id,
          connection_code: inputData,
        },
      };
      const flag = await connectUserCode(params);
      // console.log(flag.connected);
      if (flag.connected === true) {
        console.log("등록 성공");
        setInputReadOnly(flag.connected);
        // openRegistCodeModal();
        // force a page reload
      } else {
        console.log("입력 코드가 틀렸다는 모달 나와야함");
        // 입력 코드가 틀렸다는 모달 나와야함
        openCodeFailModal();
      }
    } else {
      console.log("입력값이 없다는 모달 나와야함");
      // 입력값이 없다는 모달 나와야함
      openFailModal();
    }
  };

  // ==================================================================
  const navigate = useNavigate();

  // 채팅방이 없을 시 채팅 아이콘 클릭시 이 함수 호출
  const onCreateRoom = useCallback(() => {
    const roomName = `${user.user_id}'s_room`;
    socket.emit("create-room", { roomName, user }, (response) => {
      if (response.number === 2) {
        socket.emit("join-room", response.payload, () => {
          navigate(`/chat/${response.payload}`);
        }); // 이미 채팅방이 존재할 경우 바로 입장
      }
      if (response.number === 0) return alert(response.payload);
      navigate(`/chat/${response.payload}`);
    });
  }, [navigate]);

  // 코드 존재 여부 확인 (수정 필요)
  const [isConnect, setIsConnect] = useState("");
  const isConnected = async () => {
    try {
      const state = await getConnectedUser();
      // console.log(state);
      setIsConnect(state.data.is_connected);
    } catch (error) {
      console.log("Failed to get connected status:", error);
    }
  };

  useEffect(() => {
    isConnected();
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div>
          {/* 접히는 사이드바 */}
          {/* <Transition.Root show={sidebarOpen} as={Fragment}>
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
                                        : "text-indigo-200 hover:text-white hover:bg-indigo-700",
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
                                      : "text-indigo-200 hover:text-white hover:bg-indigo-700",
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

                          {!isConnect ? (
                            <>
                              <li className="mt-auto">
                                <div className="-mx-2 flex gap-x-3 rounded-md p-2 text-lg font-semibold leading-6 text-indigo-200">
                                  <Cog6ToothIcon
                                    className="h-6 w-6 shrink-0 text-indigo-200"
                                    aria-hidden="true"
                                  />
                                  코드 등록
                                </div>
                                <div className="w-full max-w-md lg:col-span-5 lg:pt-2">
                                  <div className="flex gap-x-4">
                                    <input
                                      id="code"
                                      name="code"
                                      type="text"
                                      required
                                      className={`min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                                        inputReadOnly
                                          ? "bg-gray-500 bg-opacity-100"
                                          : ""
                                      }`}
                                      placeholder="코드 입력"
                                      readOnly={inputReadOnly} // readonly 속성 추가
                                      onChange={handleInputChange}
                                    />
                                    <button
                                      type="submit"
                                      className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                      onClick={handleRegistCode}
                                    >
                                      등록
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
          </Transition.Root> */}

          {/* 기본 사이드바 */}
          {/* Static sidebar for desktop */}
          {/* <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
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
                                : "text-indigo-200 hover:text-white hover:bg-indigo-700",
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
                              : "text-indigo-200 hover:text-white hover:bg-indigo-700",
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

                  {/* 기본 사이드바 코드 등록 여부 */}
                  {/* {!isConnect ? (
                    <>
                      <li className="mt-auto">
                        <div className="-mx-2 flex gap-x-3 rounded-md p-2 text-lg font-semibold leading-6 text-indigo-200">
                          <Cog6ToothIcon
                            className="h-6 w-6 shrink-0 text-indigo-200"
                            aria-hidden="true"
                          />
                          코드 등록
                        </div>
                        <div className="w-full max-w-md lg:col-span-5 lg:pt-2">
                          <div className="flex gap-x-4">
                            <input
                              id="code"
                              name="code"
                              type="text"
                              required
                              className={`min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                                inputReadOnly
                                  ? "bg-gray-500 bg-opacity-100"
                                  : ""
                              }`}
                              placeholder="코드 입력"
                              readOnly={inputReadOnly} // readonly 속성 추가
                              onChange={handleInputChange}
                            />
                            <button
                              type="submit"
                              className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              onClick={handleRegistCode}
                            >
                              등록
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
          </div> */}

          {/* 헤더 */}
          <div className="">
            <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
              {/* <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button> */}

              {/* Separator */}
              {/* <div
                className="h-6 w-px bg-gray-900/10 lg:hidden"
                aria-hidden="true"
              /> */}

              <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <div className="relative flex flex-1"></div>
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                  {/* <button
                    type="button"
                    className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                    onClick={handleAlarm}
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button> */}

                  {/* Separator */}
                  {/* <div
                    className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                    aria-hidden="true"
                  /> */}

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative">
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

            <main>
              <Outlet />
            </main>
          </div>
        </div>

        {/* Modal Area */}
        {/* {registCodeModal && (
          <SuccessModal closeModal={closeRegistCodeModal} message="등록완료" />
        )} */}
        {failModal && (
          <FailModal closeModal={closeFailModal} message="입력값이 없습니다." />
        )}
        {registCodeFailModal && (
          <FailModal
            closeModal={closeCodeFailModal}
            message="코드가 틀렸습니다."
          />
        )}
      </QueryClientProvider>
    </>
  );
}
