import { React, useState, useEffect } from "react";
import { missionReadChild } from "../../api/mission.ts";

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
