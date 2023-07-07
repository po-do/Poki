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
import BottomButton from "../General/BottomButton.jsx";

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
        setInputReadOnly(flag.connected);
        // openRegistCodeModal();
        // force a page reload
      } else {
        // 입력 코드가 틀렸다는 모달 나와야함
        openCodeFailModal();
      }
    } else {
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
          {/* 헤더 */}
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="relative flex flex-1"></div>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                {/* Profile dropdown */}
                <Menu as="div" className="relative flex">
                  <a
                    className="my-auto mr-4 rounded-md border border-transparent bg-indigo-600 px-2 py-1 text-sm text-white shadow-sm hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    href="/"
                  >
                    로그아웃
                  </a>
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
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
          <div className="h-16">
            <BottomButton />
          </div>
        </div>
      </QueryClientProvider>
    </>
  );
}
