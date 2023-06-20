import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../App";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/user";

const WaitingRoom = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const roomListHandler = (rooms) => {
      setRooms(rooms);
    };

    const createRoomHandler = (newRoom) => {
      setRooms((prevRooms) => [...prevRooms, newRoom]);
    };

    const deleteRoomHandler = (roomName) => {
      setRooms((prevRooms) => prevRooms.filter((room) => room !== roomName));
    };

    socket.emit("room-list", roomListHandler);
    socket.on("create-room", createRoomHandler);
    socket.on("delete-room", deleteRoomHandler);

    return () => {
      socket.off("room-list", roomListHandler);
      socket.off("create-room", createRoomHandler);
      socket.off("delete-room", deleteRoomHandler);
    };
  }, []);

  const user = useRecoilValue(userState); // Recoil에서 사용자 정보 받아오기

  // 채팅방이 없을 시 채팅 아이콘 클릭시 이 함수 호출
  const onCreateRoom = useCallback(() => {
    const roomName = `${user.user_id}'s_room`;
    socket.emit("create-room", { roomName, user }, (response) => {
      if (response.number === 2) {
        onJoinRoom(response.payload);
      }
      if (response.number === 0) return alert(response.payload);
      navigate(`/chat/${response.payload}`);
    });
  }, [navigate]);

  // 채팅방 삭제(우리 서비스에 필요 X)
  const onDeleteRoom = useCallback(
    (roomName) => () => {
      socket.emit("delete-room", roomName, (response) => {
        if (response.success) {
          navigate("/chat"); // 삭제 후 목록으로 이동
        } else {
          // Handle delete failure if needed
        }
      });
    },
    [navigate]
  );

  // 우리 서비스에서는 같은 버튼으로 채팅방 입장/생성을 구분할 수 있도록 해야함
  const onJoinRoom = useCallback(
    (roomName) => () => {
      socket.emit("join-room", roomName, () => {
        navigate(`/chat/${roomName}`);
      });
    },
    [navigate]
  );

  return (
    <>
      <div className="mt-3 flex justify-between items-center">
        <div>채팅방 목록</div>
        <button className="px-3 py-1" onClick={onCreateRoom}>
          채팅방 생성
        </button>
      </div>

      <table className="w-full border border-black border-collapse mt-3">
        <thead className="whitespace-pre">
          <tr>
            <th className="py-1 border border-black">방번호</th>
            <th className="py-1 border border-black">방이름</th>
            <th className="py-1 border border-black">입장</th>
            <th className="py-1 border border-black">삭제</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {rooms.map((room, index) => (
            <tr key={room}>
              <td className="border border-black">{index + 1}</td>
              <td className="border border-black">{room}</td>
              <td className="border border-black">
                <button onClick={onJoinRoom(room)}>입장하기</button>
              </td>
              <td className="border border-black">
                <button onClick={onDeleteRoom(room)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default WaitingRoom;
