import { React, useState, useEffect } from "react";
import { missionReadChild } from "../../api/mission.ts";

const people = [
  { name: 'Lindsay Walto Lindsay Walto' },
  { name: 'Lindsay Walto Lindsay Walto' },
  { name: 'Lindsay Walto Lindsay Walto' },
  { name: 'Lindsay Walto Lindsay Walto' },
  { name: 'Lindsay Walto Lindsay Walto' },
  { name: 'Lindsay Walto Lindsay Walto' },
  { name: 'Lindsay Walto Lindsay Walto' },
  { name: 'Lindsay Walto Lindsay Walto' },
  { name: 'Lindsay Walto Lindsay Walto' },
  { name: 'Lindsay Walto Lindsay Walto' },

  // More people...
]

// 자녀가 완료된 미션을 보여주는 컴포넌트
export default function MissionComplete() {
  // const tmp_user_id = { user_id: "2" };
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    getMission();
  }, [missions]);

  const getMission = async () => {
    const missionsData = await missionReadChild();
    const completeMissions = missionsData.filter(
      (mission) => mission.status === "COMPLETE"
    );
    setMissions(completeMissions);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
        <h3 className="text-xl font-bold mb-4">완료 대기 미션</h3>
          <p className="mt-2 text-sm text-gray-700">
            현재 완료된 미션 목록입니다.
          </p>
        </div>
      </div>
      <div className="mt-8 overflow-y-auto overflow-x-hidden max-h-60">
        <div className="-mx-4 -my-2  sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    완료된 미션
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">수정</span>
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">삭제</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {people.map((person) => (
                  <tr key={person.email}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {person.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
