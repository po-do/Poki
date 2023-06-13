import React from "react";
import { useQuery } from "@tanstack/react-query";
import { missionConfirm } from "../../api/mission.ts";

// 자녀가 완료된 미션을 보여주는 컴포넌트
export default function MissionComplete() {
  const { data: missions } = useQuery(["missions"], missionConfirm);

  return (
    <>
      <h3 className="text-xl font-bold mb-4">완료된 미션</h3>
      <ul className="list-disc ml-6">
        {missions &&
          missions.map((mission, index) => (
            <li key={index}>{mission.content}</li>
          ))}
      </ul>
    </>
  );
}
