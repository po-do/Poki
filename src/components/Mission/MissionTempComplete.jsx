import React, { useState, useEffect } from "react";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import {
  missionReadChild,
  missionUpdate,
  setMissionStatusComplete,
} from "../../api/mission.ts";
import { updateBoard, getBoardByUserId } from "../../api/board.ts";

// 미션의 상태가 WAIT_APPROVAL 즉 완료대기상태인것을 보여주는 컴포넌트
export default function MissionTempComplete() {
  const queryClient = new QueryClient();
  // const userId = 2;
  // const tmp_user_id = { user_id: "2" };
  const [grape, setGrape] = useState(null);
  const [missions, setMissions] = useState([]);
  const [selectedMissions, setSelectedMissions] = useState([]);

  const boardQuery = useQuery(["boardState"], () => {
    return getBoardByUserId();
  });

  useEffect(() => {
    if (boardQuery.isSuccess) {
      const fetchedGrape = boardQuery?.data?.data?.grape[0];
      setGrape(fetchedGrape);
    }
  }, [boardQuery.isSuccess, boardQuery.data]);

  useEffect(() => {
    getMission();
    console.log("there is something fetching data!");
  }, [boardQuery.isSuccess, boardQuery.data, missions]);

  const getMission = async () => {
    const missionsData = await missionReadChild();
    const incompleteMissions = missionsData.filter(
      (mission) => mission.status === "WAIT_APPROVAL"
    );
    setMissions(incompleteMissions);
  };

  const { mutate: complete } = useMutation(setMissionStatusComplete, {
    onSuccess: async () => {
      await addGrape();
      queryClient.invalidateQueries("missions");
    },
  });

  const mutation = useMutation(missionUpdate, {
    onSuccess: () => {
      queryClient.invalidateQueries("missions");
    },
  });

  const addGrape = async () => {
    const prevStatus = grape;
    console.log(prevStatus, "prev!");

    const newStatus = {
      blank: prevStatus?.blank,
      attached_grapes: prevStatus?.attached_grapes,
      total_grapes: prevStatus?.total_grapes + 1,
      deattached_grapes: prevStatus?.deattached_grapes + 1,
    };
    const boardStatus = {
      grapeId: 2,
      request: newStatus,
    };
    console.log(newStatus, "this is new status");

    await updateBoard(boardStatus);
    //await attachBoard(boardStatus);
  };

  const handleCheckboxChange = (e, missionId) => {
    if (e.target.checked) {
      setSelectedMissions([...selectedMissions, missionId]);
    } else {
      setSelectedMissions(selectedMissions.filter((id) => id !== missionId));
    }
  };

  const handleReject = () => {
    selectedMissions.forEach((missionId) => {
      const updatedMission = {
        ...missions.find((mission) => mission.id === missionId),
      };
      complete({
        mission_id: missionId,
      });
    });
    setSelectedMissions([]);
  };

  const handlePublish = () => {
    // console.log(selectedMissions);
    selectedMissions.forEach((missionId) => {
      const updatedMission = {
        ...missions.find((mission) => mission.id === missionId),
      };
      complete({
        mission_id: missionId,
      });
    });
    setSelectedMissions([]);
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">완료 대기 미션</h3>
      <ul className="space-y-2">
        {missions.map((mission, index) => (
          <li key={index}>
            {mission.content}
            <input
              type="checkbox"
              className="ml-2"
              onChange={(e) => handleCheckboxChange(e, mission.id)}
            />
          </li>
        ))}
      </ul>
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
