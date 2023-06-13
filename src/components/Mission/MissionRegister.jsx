import React from "react";

export default function MissionRegister() {
  const handleRegister = () => {
    console.log("등록")
  }
  return (
    <>
      <h3 className="text-xl font-bold mb-4">미션 등록</h3>
      <div className="flex items-center">
        <input
          id="mission-register"
          type="text"
          className="input border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 ml-2"
          placeholder="미션을 입력하세요"
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded ml-2" onClick={handleRegister}>
          등록
        </button>
      </div>
    </>
  );
}
