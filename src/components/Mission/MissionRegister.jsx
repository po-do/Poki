import React from "react";

export default function MissionRegister() {
  return (
    <>
      <h3 className="text-xl font-bold mb-4">미션 등록</h3>
      <div className="flex items-center">
        <input
          id="mission-register"
          type="text"
          className="input mr-2 border-black border-solid h-10"
          placeholder="미션을 입력하세요"
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          등록
        </button>
      </div>
    </>
  );
}
