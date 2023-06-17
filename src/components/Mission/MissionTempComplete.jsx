import React, { useState, useEffect } from "react";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import {
  missionReadChild,
  missionUpdate,
  setMissionStatusComplete,
} from "../../api/mission.ts";
import { updateBoard, getBoardByUserId } from "../../api/board.ts";

const people = [
  { name: 'Lindsay Walto Lindsay Walto' },
  { name: 'Lindsay Walto Lindsay Walto' },
  // More people...
]

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
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
        <h3 className="text-xl font-bold mb-4">완료 대기 미션</h3>
          <p className="mt-2 text-sm text-gray-700">
            현재 수행된 미션 목록입니다.
          </p>
        </div>
        <div className="flex mt-4 sm:ml-16 sm:mt-0 sm:flex-none gap-2">
          <div>
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            반려
          </button>
          </div>
          
          <div>
            <button
              type="button"
              className="block rounded-md bg-blue-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              포도알 발행
            </button>
          </div>
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
