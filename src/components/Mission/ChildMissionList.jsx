import { React, useEffect, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
import { newMissionRead, setMissionStatusWait } from "../../api/mission.js";
import SuccessModal from "../../components/Modal/SuccessModal";
import FailModal from "../../components/Modal/FailModal";

// 최근 등록된미션 보여주는 컴포넌트
export default function RecentMissionList() {
  const [missions, setMissions] = useState([]);
  const [checkedMissionsId, setCheckedMissionsId] = useState([]);
  const [checkedMissionsList, setCheckedMissionsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [failModal, setFailModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openFailModal = () => {
    setFailModal(true);
  };

  const closeFailModal = () => {
    setFailModal(false);
  };

  useEffect(() => {
    getMission();
  }, [missions]);

  const getMission = async () => {
    const missionsData = await newMissionRead();
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
    }
  };

  const handleClick = async () => {
    await Promise.all(
      checkedMissionsId.map((missionId) =>
        setMissionStatusWait({ mission_id: missionId })
      )
    );
    if (checkedMissionsId.length > 0) {
      openModal();
    } else {
      openFailModal();
    }
    setCheckedMissionsId([]);
    setMissions([]);
  };

  const getRecentMissions = () => {
    const recentMissions = missions.slice(0, 5); // 최근 등록된 5개의 미션만 가져옵니다.
    return recentMissions.map((mission, index) => (
      <div key={index}>
        <div className="relative flex items-start py-4">
          <div className="min-w-0 flex-1 text-sm leading-6">
            <label className="select-none font-medium text-gray-900">
              {mission.content}
            </label>
          </div>
          <div className="ml-3 flex h-6 items-center">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              onChange={(e) => handleChange(e, mission)}
            />
          </div>
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              등록된 미션
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              부모님이 등록한 최근 5개의 미션을 보여드립니다.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              onClick={handleClick}
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              포도알 요청
            </button>
          </div>
        </div>
        <legend className="text-base leading-6 text-gray-900 mt-4">
          Mission
        </legend>
        <div className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
          {missions && getRecentMissions()}
        </div>
      </div>

      {showModal && (
        <SuccessModal closeModal={closeModal} message="포도알 요청 완료" />
      )}
      {failModal && <FailModal closeModal={closeFailModal} message="체크박스를 선택 해주세요."/>}
    </>
  );
}