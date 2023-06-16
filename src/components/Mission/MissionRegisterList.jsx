import { React, useEffect, useState } from "react";
import { missionReadChild, missionDelete } from "../../api/mission.ts";
import UpdateMissionModal from "../Modal/UpdateMissionModal";

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
      <h3 className="text-xl font-bold mb-4">등록된 미션</h3>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <p className="text-sm text-gray-700">
              부모님이 등록한 미션을 보여드립니다.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          </div>
        </div>
        <div className="mt-2 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 h-[20rem] overflow-auto">
              <table className="min-w-full divide-y divide-gray-300">
                <tbody className="divide-y divide-gray-200">
                  {/* 내용 삽입 필요 */}
                    {missions.map((mission, index) => (
                      <tr key={index}>
                        {mission.content}
                        <input
                          type="checkbox"
                          className="ml-2"
                          onChange={(e) => handleChange(e, mission)}
                        />
                        hello
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <ul className="space-y-2">
        {missions.map((mission, index) => (
          <li key={index}>
            {mission.content}
            <input
              type="checkbox"
              className="ml-2"
              onChange={(e) => handleChange(e, mission)}
            />
          </li>
        ))}
      </ul>



      <div className="flex gap-x-2">
        <div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={openModal}
          >
          수정
          </button>
          {showModal && (
            <UpdateMissionModal
              onClose={closeModal}
              container={checkedMissionsList}
            />
          )}
        </div>
        <div> 
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleDelete}
          >
            삭제
          </button>
        </div>
      </div>
      
    </>
  );
}
