import React from "react";

export default function MissionRegisterList() {
  return (
    <>
      <h3 className="text-xl font-bold mb-4">등록된 미션</h3>
      <ul className="space-y-2">
        <li className="flex items-center">
          신발장 정리
          <input type="checkbox" name="" id="" className="ml-2" />
        </li>
        <li className="flex items-center">
          신발장 정리
          <input type="checkbox" name="" id="" className="ml-2" />
        </li>
        <li className="flex items-center">
          신발장 정리
          <input type="checkbox" name="" id="" className="ml-2" />
        </li>
      </ul>
      <button className="px-4 py-2 bg-blue-500 text-white rounded">수정</button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded">삭제</button>
    </>
  );
}
