import React from "react";
import { useQuery } from "@tanstack/react-query";
import { missionRead } from "../../api/mission.ts";

// 최근 등록된미션 5개를 보여주는 컴포넌트
export default function RecentMissionList() {
  const { data: missions } = useQuery(["missions"], missionRead);

  const getRecentMissions = () => {
    const recentMissions = missions.slice(0, 5); // 최근 등록된 5개의 미션만 가져옵니다.
    return recentMissions.map((mission, index) => (
      <li key={index} className="flex items-center">
        {mission.content}
        <input type="checkbox" className="form-checkbox" />
      </li>
    ));
  };

  return (
    <>
      <h3 className="text-lg font-bold mb-4">등록된 미션</h3>
      <ul className="space-y-2">{missions && getRecentMissions()}</ul>
    </>
  );
}
