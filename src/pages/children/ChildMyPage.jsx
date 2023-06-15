import React, { useState } from "react";
import { connectUserCode } from "../../api/auth.ts";

export default function ParentMyPage() {
  const [inputData, setInputData] = useState("");

  //   const handleMissionCreate = () => {
  //     var date = new Date();
  //     const createdDate =
  //       date.getFullYear().toString() +
  //       "-" +
  //       (date.getMonth() + 1).toString().padStart(2, "0") +
  //       "-" +
  //       date.getDate().toString();

  //     const params = {
  //       request: {
  //         content: missionContent,
  //         created_date: createdDate,–
  //         completed_date: createdDate,
  //       },
  //     };
  //     console.log(params);
  //     mutation.mutate(params);
  //   };

  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const handleRegistCode = () => {
    const params = {
      request: {
        // 	"id": "rlawodnjs2",
        // 	"connection_code": "jgxyi"
        // id: missionContent,
        connection_code: inputData,
      },
    };
    connectUserCode(params);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">MyPage</h1>
      <p className="mb-2">자녀가 등록해야 할 코드</p>
      <input
        type="text"
        className="bg-gray-100 px-4 py-2 mb-4 w-52"
        value={inputData}
        onChange={handleInputChange}
      />
      <button
        onClick={handleRegistCode}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
      >
        등록
      </button>
    </div>
  );
}
