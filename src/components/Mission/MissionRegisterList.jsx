import { React, useEffect, useState } from "react";
import { missionReadChild, missionDelete } from "../../api/mission.ts";
import UpdateMissionModal from "../Modal/UpdateMissionModal";

const people = [
  { name: 'Lindsay Walto Lindsay Walto' },
  { name: 'Lindsay Walto Lindsay Walto' },
  // More people...
]

export default function MissionRegisterList() {
  // const tmp_user_id = { user_id: "2" };
  const [missions, setMissions] = useState([]);
  const [checkedMissionsId, setCheckedMissionsId] = useState([]);
  const [checkedMissionsList, setCheckedMissionsList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

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
      // checkedMissionsList에서 채크 안된놈들 지우기
    }
  };

  // 미션수정 ===================

  // 미션삭제 ===================
  const handleDelete = async () => {
    await Promise.all(
      checkedMissionsId.map((missionId) =>
        missionDelete({ mission_id: missionId })
      )
    );
    setCheckedMissionsId([]);
    setMissions([]);
  };

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 ">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
        <h3 className="text-xl font-bold mb-4">등록된 미션</h3>
          <p className="mt-2 text-sm text-gray-700">
            현재 등록된 미션 목록입니다.
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
                    등록된 미션
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {people.map((person) => (
                  <tr key={person.email}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {person.name}
                    </td>
                    <td className="flex relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 gap-2 ">
                      <div>
                        <button
                          onClick={openModal}
                          className="text-indigo-600 hover:text-indigo-900 font-bold"
                          >
                          수정
                          <span className="sr-only">, {person.name}</span>
                        </button>
                      </div>
                      <div>
                        <button
                          onClick={openModal}
                          className="text-indigo-600 hover:text-indigo-900 font-bold"
                        >
                          삭제
                          <span className="sr-only">, {person.name}</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
