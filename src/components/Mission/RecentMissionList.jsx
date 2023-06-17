import { React, useEffect, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
import { missionReadChild, setMissionStatusWait } from "../../api/mission.ts";

// 최근 등록된미션 보여주는 컴포넌트
export default function RecentMissionList() {
  const [missions, setMissions] = useState([]);
  const [checkedMissionsId, setCheckedMissionsId] = useState([]);
  const [checkedMissionsList, setCheckedMissionsList] = useState([]);

  useEffect(() => {
    getMission();
  }, [missions]);

  const getMission = async () => {
    const missionsData = await missionReadChild();
    const incompleteMissions = missionsData.filter(
      (mission) => mission.status === "INCOMPLETE"
    );
    setMissions(incompleteMissions);
  };

  const handleChange = (e, mission) => {
    if (e.target.checked) {
      setCheckedMissionsId([...checkedMissionsId, mission.id]);
      setCheckedMissionsList([...checkedMissionsList, mission]);
    } else {
      setCheckedMissionsId(checkedMissionsId.filter((id) => id !== mission.id));
      setCheckedMissionsList(checkedMissionsList.filter((m) => m === mission));
    }
  };

  const handleClick = async () => {
    await Promise.all(
      checkedMissionsId.map((missionId) =>
        setMissionStatusWait({ mission_id: missionId })
      )
    );
    setCheckedMissionsId([]);
    setMissions([]);
  };

  const getRecentMissions = () => {
    const recentMissions = missions.slice(0, 5); // 최근 등록된 5개의 미션만 가져옵니다.
    return recentMissions.map((mission, index) => (
      <>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
          {mission.content}
        </td>
        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-0">
          <input
            type="checkbox"
            className="form-checkbox"
            onChange={(e) => handleChange(e, mission)}
          />
        </td>
      </>
    ));
  };

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              등록된 미션
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              부모님이 등록한 미션을 보여드립니다.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              onClick={handleClick}
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              포도알 요청
            </button>
          </div>
        </div>
        <div className="mt-2 flow-root">
          <div className="-mx-4 -my-2 overflow-y-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 h-[20rem] overflow-auto">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Mission
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr key="email">{missions && getRecentMissions()}</tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
