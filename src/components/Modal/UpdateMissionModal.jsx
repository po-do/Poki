import { React, useEffect, useRef, useState } from "react";
import { missionUpdate } from "../../api/mission.ts";

export default function UpdateMissionModal({ onClose, container }) {
  const [missionUpdates, setMissionUpdates] = useState([]);
  const inputsRef = useRef([]);

  useEffect(() => {
    setMissionUpdates(
      container.map((mission) => ({
        ...mission,
        request: { content: mission.content },
      }))
    );
    inputsRef.current = inputsRef.current.slice(0, container.length);
  }, [container]);

  const missionRegist = async () => {
    var date = new Date();
    const createdDate =
      date.getFullYear().toString() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString();

    for (let i = 0; i < missionUpdates.length; i++) {
      if (inputsRef.current[i].value) {
        missionUpdates[i].request.content = inputsRef.current[i].value;
      }
      const params = {
        mission_id: missionUpdates[i].id,
        request: {
          content: missionUpdates[i].request.content,
          created_date: createdDate,
        },
      };
      console.log("서버로 전달하는 데이터");
      console.log(params);
      await missionUpdate(params);
    }

    onClose();
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md shadow-md">
        <div className="mb-6">
          <h2 className="text-xl font-bold">미션 수정</h2>
          {container.map((mission, index) => (
            <div key={mission.mission_id}>
              <p className="w-full px-4 py-2 mt-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                {mission.content}
              </p>
              <input
                ref={(el) => (inputsRef.current[index] = el)}
                id="mission-register"
                type="text"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="수정할 내용을 입력하세요"
                defaultValue={mission.content}
              />
            </div>
          ))}
        </div>
        <button
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-md cursor-pointer"
          onClick={missionRegist}
        >
          등록
        </button>
        <button
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-md cursor-pointer mt-1"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
}
