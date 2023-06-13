import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { missionRead, missionDelete } from "../../api/mission.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function MissionRegisterList() {
  const queryClient = useQueryClient();
  

  const { data: missions } = useQuery(["missions"], missionRead);
  const [selectedMissions, setSelectedMissions] = useState([]);

  const deleteMissionMutation = useMutation(missionDelete, {
    onSuccess: () => {
      queryClient.invalidateQueries("missions");
    },
  });

  const handleCheckboxChange = (missionId) => {
    if (selectedMissions.includes(missionId)) {
      setSelectedMissions(selectedMissions.filter((id) => id !== missionId));
    } else {
      setSelectedMissions([...selectedMissions, missionId]);
    }
  };

  const handleDeleteSelectedMissions = () => {
    selectedMissions.forEach((missionId) => {
      deleteMissionMutation.mutate({ mission_id: missionId });
    });
    setSelectedMissions([]);
  };

  return (
    <>
      <h3 className="text-xl font-bold mb-4">등록된 미션</h3>
      <ul className="space-y-2">
        {missions &&
          missions.map((mission, index) => (
            <li key={index}>
              {mission.content}
              <input
                type="checkbox"
                className="ml-2"
                checked={selectedMissions.includes(mission.mission_id)}
                onChange={() => handleCheckboxChange(mission.mission_id)}
              />
            </li>
          ))}
      </ul>
      <button className="px-4 py-2 bg-blue-500 text-white rounded">수정</button>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleDeleteSelectedMissions}
      >
        삭제
      </button>
    </>
  );
}
