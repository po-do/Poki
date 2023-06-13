import React from "react";

export default function RecentMissionList() {
  return (
    <>
      <h3 className="text-lg font-bold mb-4">등록된 미션</h3>
      <ul className="space-y-2">
        <li className="flex items-center">
          <span className="mr-2">신발장 정리</span>
          <input type="checkbox" className="form-checkbox" />
        </li>
        <li className="flex items-center">
          <span className="mr-2">신발장 정리</span>
          <input type="checkbox" className="form-checkbox" />
        </li>
        <li className="flex items-center">
          <span className="mr-2">신발장 정리</span>
          <input type="checkbox" className="form-checkbox" />
        </li>
      </ul>
    </>
  );
}
