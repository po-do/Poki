import React, { useState } from "react";

export default function LinkRegisterModal({ onClose }) {
  const [productName, setProductName] = useState("");
  const [url, setUrl] = useState("");

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };


  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md shadow-md">
        <div className="mb-6">
          <h2 className="text-xl font-bold">선물 검색하기</h2>
          <input
            id="mission-register-two"
            type="text"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="URL을 입력하세요"
            value={url}
            onChange={handleUrlChange}
          />
        </div>

      </div>
    </div>
  );
}