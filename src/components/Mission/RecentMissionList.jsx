import React, { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
import { missionReadChild, setMissionStatusWait } from "../../api/mission.ts";

// 최근 등록된미션 5개를 보여주는 컴포넌트
export default function RecentMissionList() {
  const inputParent = { user_id: 2 };
  const [missions, setMissions] = useState([]);
  const [checkedMissionsId, setCheckedMissionsId] = useState([]);
  const [checkedMissionsList, setCheckedMissionsList] = useState([]);
  // const { data: missions } = useQuery(
  //   ["missions", inputParent],
  //   missionReadChild
  // );
  useEffect(() => {
    getMission();
  }, [missions]);

  const getMission = async () => {
    const missionsData = await missionReadChild(inputParent);
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

  // const inputChild = { user_id: 37 };
  // setMissionStatusWait

  const getRecentMissions = () => {
    const recentMissions = missions.slice(0, 5); // 최근 등록된 5개의 미션만 가져옵니다.
    return recentMissions.map((mission, index) => (
      <li key={index} className="flex items-center">
        {mission.content}
        <input type="checkbox" className="form-checkbox" onChange={(e) => handleChange(e, mission)}/>
      </li>
    ));
  };

  return (
    <>
      <h3 className="text-lg font-bold mb-4">등록된 미션</h3>
      <ul className="space-y-2">{missions && getRecentMissions()}</ul>
      <button className="px-4 py-2 bg-purple-600 text-white rounded-r-md" onClick={handleClick}>
        포도알 요청
      </button>
    </>
  );
}
