import classNames from "classnames";
import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "../../App";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/user";
import { ChatRead } from "../../api/chat.js";

// 채팅방 설정
const ChatRoom = () => {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const chatContainerEl = useRef(null);

  const { roomName } = useParams();
  const navigate = useNavigate();

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
        setChats(response.Data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchChatData();
  }, [roomName]);

  // 채팅방 메시지 전송
  useEffect(() => {
    const messageHandler = (chat) =>
      setChats((prevChats) => [...prevChats, chat]);
    socket.on("message", messageHandler);

    return () => {
      socket.off("message", messageHandler);
    };
  }, []);

  // 채팅방 나가기
  const onChange = useCallback((e) => {
    setMessage(e.target.value);
  }, []);

  const user = useRecoilValue(userState); // Recoil에서 사용자 정보 받아오기

  // 메시지 전송
  const onSendMessage = useCallback(
    (e) => {
      e.preventDefault();
      if (!message) return alert("메시지를 입력해 주세요.");

      // 서버로 메시지와 사용자 정보 전송
      socket.emit("message", { roomName, message, user }, (chat) => {
        setChats((prevChats) => [...prevChats, chat]);
        setMessage("");
      });
    },
    [message, roomName, user]
  );

  // 채팅방 나가기(우리 서비스에는 필요 없을 듯)
  const onLeaveRoom = useCallback(() => {
    socket.emit("leave-room", roomName, () => {
      navigate(`/format/${user.type}/message`);
    });
  }, [navigate, roomName]);

  return (
    <>
      <h1>Chat Room: {roomName}</h1>
      <button className="mb-2 block ml-auto" onClick={onLeaveRoom}>
        방 나가기
      </button>
      <div
        ref={chatContainerEl}
        className="flex flex-col border border-black p-4 min-h-[360px] max-h-[600px] overflow-auto bg-[#b2c7d9]"
      >
        {chats.map((chat, index) => (
          <div
            key={index}
            className={classNames({
              "self-end": user.id === chat.check_id,
              "self-center": !chat.sender_id,
              "flex flex-col": true,
            })}
          >
            <span>
              {chat.sender_id
                ? user.id === chat.check_id
                  ? ""
                  : chat.sender_id
                : ""}
            </span>
            <span
              className={`mb-2 bg-white w-max p-3 rounded-md ${
                user.id === chat.check_id ? "bg-yellow-300 self-end" : ""
              }`}
            >
              {chat.message}
            </span>
          </div>
        ))}
      </div>
      <form className="flex mt-6" onSubmit={onSendMessage}>
        <input
          type="text"
          onChange={onChange}
          value={message}
          className="flex-grow mr-4"
        />
        <button>보내기</button>
      </form>
    </>
  );
};

export default ChatRoom;
