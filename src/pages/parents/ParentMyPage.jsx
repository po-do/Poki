import React, { useState } from "react";
import { createUserCode } from "../../api/auth.ts";

export default function ParentMyPage() {
  const [issuedData, setIssuedData] = useState("");

  const handleIssu = () => {
    const newData = createUserCode();
    newData
      .then(function (result) {
        console.log(result.data); // 여기서 data에 접근 가능
        setIssuedData(result.data.connection_code);
      })
      .catch(function (error) {
        console.error("Error:", error); // 오류 발생시 처리
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">MyPage</h1>
      <p className="mb-2">자녀가 입력해야 할 등록용 코드</p>
      <input
        type="text"
        value={issuedData}
        readOnly
        className="bg-gray-100 px-4 py-2 mb-4 w-52"
      />
      <button
        onClick={handleIssu}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
      >
        발급
      </button>
    </div>
  );
}
