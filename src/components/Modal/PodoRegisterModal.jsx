import React, { useState } from "react";
import { createBoard } from "../../api/board.ts";

export default function PodoRegisterModal({ onClose , isSelected}) {
  const [podoData, setpodoData] = useState("");
  
  const handleUrlChange = (e) => {
    setpodoData(e.target.value);
  };

  const handleRegister = async () => {
    try {
      // Create an object with the data to send to the server
      const data = {
        request: {
          blank: parseInt(podoData),
          total_grapes: 0,
          attached_grapes: 0,
          deattached_grapes: 0
        }
      };
      
      // Make a POST request to create the wishlist item
      const response = await createBoard(data);
      console.log("등록완료:", response);
    } catch (error) {
      console.log("등록 실패:", error);
    }
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md shadow-md">
        <div className="mb-6">
          <h2 className="text-xl font-bold">보상 등록</h2>
          {isSelected?`아이템 ID : ${isSelected}`:"값이 없습니다."}
          <input
            id="mission-register-two"
            type="text"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder={isSelected?`포도알 개수를 입력하세요`:"포도알을 선택해 주세요"}
            value={podoData}
            onChange={handleUrlChange}
          />
        </div>
        <button
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-md cursor-pointer"
          onClick={handleRegister}
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