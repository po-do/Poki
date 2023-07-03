import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../../App";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/user";
import { ChatRead } from "../../api/chat.js";
import ParentImg from "../../icons/Character/parent.png";
import ChildImg from "../../icons/Character/child.png";
import grapeLogo from "../../icons/Character/child.png";

import moment from "moment-timezone";

moment.updateLocale("en", {
  meridiem: function (hour, minute, isLowercase) {
    if (hour >= 12) {
      return "오후";
    } else {
      return "오전";
    }
  },
});

// 채팅방 설정
const ChatRoom = () => {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const chatContainerEl = useRef(null);
  const { roomName } = useParams();
  const [assigned, setAssigned] = useState(false);

  const openIcon = () => {
    setAssigned(!assigned);
  };

  // 채팅방 스크롤 자동 내리기
  useEffect(() => {
    if (!chatContainerEl.current) return;
    const chatContainer = chatContainerEl.current;
    const { scrollHeight, clientHeight } = chatContainer;
    if (scrollHeight > clientHeight) {
      chatContainer.scrollTop = scrollHeight - clientHeight;
    }
  }, [chats.length]);
  // 채팅방 데이터 불러오기(채팅방 입장 시 서버에서 저장된 대화 내용 불러오기)
  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const response = await ChatRead({ room_name: roomName });
        console.log("response", response);
        console.log("roomName", roomName);
        console.log("responseData", response.Data);
        setChats(response?.Data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchChatData();
  }, [roomName]);
  const user = useRecoilValue(userState); // Recoil에서 사용자 정보 받아오기
  useEffect(() => {
    socket.emit("setUserName", {
      user_id: user.user_id,
    });
  }, [user]);

  // 채팅방 메시지 전송
  useEffect(() => {
    const messageHandler = (chat) =>
      setChats((prevChats) => [...prevChats, chat]);
    socket.on("message", messageHandler);
    return () => {
      socket.off("message", messageHandler);
    };
  }, []);
  // 채팅메시지 감지
  const onChange = useCallback((e) => {
    setMessage(e.target.value);
  }, []);
  // 메시지 전송
  const onSendMessage = useCallback(
    (e) => {
      e.preventDefault();
      if (!message) return;
      // 서버로 메시지와 사용자 정보 전송
      socket.emit("message", { roomName, message, user }, (chat) => {
        setChats((prevChats) => [...prevChats, chat]);
        setMessage("");
      });
    },
    [message, roomName, user]
  );

  const handleImageClick = (src) => {
    const updatedMessage = src;
    setMessage(updatedMessage);
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:h-full sm:max-w-[780px] mt-2">
        <div className="bg-white px-6 pb-12 shadow-lg rounded-lg sm:px-12 border border-indigo-400">
          <div className="flex pt-6 ml-4 gap-3">
            <img
              className="rounded-full bg-indigo-300 h-12 w-12 mr-2"
              src={user.type === "PARENT" ? ParentImg : ChildImg}
              alt="CharacterImg"
            />
            <div className="text-xl">{user.name}</div>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div>
              <div
                ref={chatContainerEl}
                className="flex flex-col p-4 max-[720px]:h-[28.5rem] h-[30rem] max-h-[600px] overflow-auto rounded-lg border shadow"
              >
                {chats.map((chat, index) => {
                  // 현재 메시지와 다음 메시지의 날짜를 비교
                  const currentDate = moment
                    .tz(chat.createdAt, "Asia/Seoul")
                    .format("YYYY-MM-DD");
                  const nextDate = chats[index + 1]
                    ? moment
                        .tz(chats[index + 1].createdAt, "Asia/Seoul")
                        .format("YYYY-MM-DD")
                    : null;

                  return (
                    <>
                      <div
                        key={index}
                        className={classNames({
                          "self-end": user.id === chat.check_id,
                          "self-center": !chat.sender_id,
                          "flex flex-col": true,
                        })}
                      >
                        <div className="flex">
                          {user.id === chat.check_id ? (
                            ""
                          ) : (
                            <img
                              className="rounded-full bg-indigo-300 h-12 w-12 mr-2"
                              src={
                                user.type === "PARENT" ? ChildImg : ParentImg
                              }
                              alt="CharacterImg"
                            />
                          )}
                          <div className="flex flex-col">
                            <span>
                              {chat.sender_id
                                ? user.id === chat.check_id
                                  ? ""
                                  : chat.sender_id
                                : ""}
                            </span>
                            {chat.message.startsWith("/static") ? (
                          <img
                            src={chat.message}
                            alt="ChatImage"
                            className="max-w-[320px] w-20 h-auto rounded-md mb-2"
                          />
                        ) : (
                          <span
                            className={`mb-2 w-max p-3 rounded-md sm:max-w-sm min-[320px]:max-w-[12rem] break-words ${
                              user.id !== chat.check_id
                                ? "text-indigo-500 border-indigo-400 border-2"
                                : "bg-indigo-500 text-white"
                            }`}
                          >
                            {chat.message}
                          </span>
                        )}
                            <span className="-mt-2 mb-2 text-gray-600">
                              {moment
                                .tz(chat.createdAt, "Asia/Seoul")
                                .format("A h:mm ")
                                .replace(/AM|PM/, (meridiem) =>
                                  moment
                                    .localeData()
                                    .meridiem(
                                      null,
                                      null,
                                      null,
                                      meridiem === "PM"
                                    )
                                )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        {nextDate && currentDate !== nextDate && (
                          <div className="border text-center m-1 rounded-lg bg-slate-200 shadow-lg">
                            {nextDate === null ? "" : nextDate}
                          </div>
                        )}
                      </div>
                    </>
                  );
                })}
              </div>

              <form className="flex mt-6 max-h-96" onSubmit={onSendMessage}>
                <div
                  className="relative cursor-pointer bg-white mr-2 w-[30%] rounded-lg shadow-md flex items-center justify-center"
                  onClick={openIcon}
                >
                  🙂
                </div>
                {assigned && (
                  <div className="absolute bg-white rounded-lg shadow-lg -mt-20 ml-1">
                    <div className="flex m-1">
                      <button onClick={() => handleImageClick(grapeLogo) }>
                        <img src={grapeLogo} alt="test1" className="w-10 m-3"/>
                      </button>
                    </div>
                  </div>
                )}
                <input
                  type="text"
                  onChange={onChange}
                  value={message}
                  className="block w-full rounded-md border-0 pl-4 mr-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button className="whitespace-nowrap w-20 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  보내기
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ChatRoom;
