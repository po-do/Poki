import React, { useState } from "react";
import { missionUpdate } from "../../api/mission.js";

export default function UpdateModal({ onClose, item_id }) {
  const [updateMission, setUpdateMission] = useState("");
  const handleProductNameChange = (e) => {
    setUpdateMission(e.target.value);
  };

  const handleRegister = async () => {
    try {
      var date = new Date();
      const createdDate =
        date.getFullYear().toString() +
        "-" +
        (date.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        date.getDate().toString();
      // Create an object with the data to send to the server
      const data = {
        mission_id: item_id,
        request: {
          content: updateMission,
          created_date: createdDate,
        },
      };

      // Make a POST request to create the wishlist item
      const response = await missionUpdate(data);
      console.log("수정 완료:", response);
      onClose();
    } catch (error) {
      console.log("수정 실패:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md shadow-md">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">내용 수정</h2>
          <input
            id="mission-register-one"
            type="text"
            className="w-96 px-4 py-2 mt-2 border w- border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="내용을 수정하세요"
            value={updateMission}
            onChange={handleProductNameChange}
          />
        </div>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 bg-indigo-500 text-white rounded-md cursor-pointer"
            onClick={handleRegister}
          >
            수정
          </button>
          <button
            className="px-4 py-2 bg-indigo-500 text-white rounded-md cursor-pointer"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
