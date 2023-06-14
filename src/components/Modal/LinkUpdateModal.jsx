import React, { useState } from "react";
import { updateWishList } from "../../api/wishlist.ts";

export default function LinkUpdateModal({ onClose }) {
  const [productName, setProductName] = useState("");
  const [url, setUrl] = useState("");

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleRegister = async () => {
    try {
      // Create an object with the data to send to the server
      const data = {
        request: {
          ProductName: productName,
          ProductLink: url,
        },
      };
      // Make a POST request to create the wishlist item
      const response = await updateWishList(data);
      console.log("등록완료:", response);
    } catch (error) {
      console.log("등록 실패:", error);
    }
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md shadow-md">
        <div className="mb-6">
          <h2 className="text-xl font-bold">링크 수정</h2>
          <input
            id="mission-register-one"
            type="text"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="상품명을 입력하세요"
            value={productName}
            onChange={handleProductNameChange}
          />
          <input
            id="mission-register-two"
            type="text"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="URL을 입력하세요"
            value={url}
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