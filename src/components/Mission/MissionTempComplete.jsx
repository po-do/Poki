import React, { useState } from "react";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { missionRead, missionUpdate } from "../../api/mission.ts";

// 미션의 상태가 WAIT_APPROVAL 즉 완료대기상태인것을 보여주는 컴포넌트
export default function MissionTempComplete() {
  const { data: missions } = useQuery(["missions"], missionRead);
  const mutation = useMutation(missionUpdate, {
    onSuccess: () => {
      QueryClient.invalidateQueries("missions");
    },
  });
  const [selectedMissions, setSelectedMissions] = useState([]);

  const handleCheckboxChange = (missionId) => {
    if (selectedMissions.includes(missionId)) {
      setSelectedMissions(selectedMissions.filter((id) => id !== missionId));
    } else {
      setSelectedMissions([...selectedMissions, missionId]);
    }
  };

  const handleReject = () => {
    selectedMissions.forEach((missionId) => {
      const updatedMission = {
        ...missions.find((mission) => mission.id === missionId),
        status: "INCOMPLETE",
      };
      mutation.mutate(updatedMission);
    });
    setSelectedMissions([]);
  };

  const handlePublish = () => {
    selectedMissions.forEach((missionId) => {
      const updatedMission = {
        ...missions.find((mission) => mission.id === missionId),
        status: "COMPLETE",
      };
      mutation.mutate(updatedMission);
    });
    setSelectedMissions([]);
  };

  const getTempMissions = () => {
    const incompleteMissions = missions.filter(
      (mission) => mission.status === "WAIT_APPROVAL"
    );
    return incompleteMissions.map((mission) => (
      <li key={mission.id} className="flex items-center">
        {mission.content}
        <input
          type="checkbox"
          className="form-checkbox"
          checked={selectedMissions.includes(mission.id)}
          onChange={() => handleCheckboxChange(mission.id)}
        />
      </li>
    ));
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">완료 대기 미션</h3>
      <ul className="space-y-2">{missions && getTempMissions()}</ul>
      <button
        onClick={handleReject}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        반려
      </button>
      <button
        onClick={handlePublish}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        포도알 발행
      </button>
    </div>
  );
}
