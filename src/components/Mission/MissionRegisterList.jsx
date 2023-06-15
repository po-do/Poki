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
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleDelete}
      >
        삭제
      </button>
    </>
  );
}
