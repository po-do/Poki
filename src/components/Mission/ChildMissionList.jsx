import { React, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { newMissionRead, setMissionStatusWait } from "../../api/mission.js";
import SuccessModal from "../../components/Modal/SuccessModal";
import FailModal from "../../components/Modal/FailModal";

// 데이터를 가져오는 함수
async function fetchMissions() {
  const missionsData = await newMissionRead();
  return missionsData.filter((mission) => mission.status === "INCOMPLETE");
}

// 최근 등록된미션 보여주는 컴포넌트
export default function RecentMissionList() {
  const [checkedMissionsId, setCheckedMissionsId] = useState([]);
  const [checkedMissionsList, setCheckedMissionsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [failModal, setFailModal] = useState(false);
  const { data: missions, refetch } = useQuery(["missions"], fetchMissions, {
    refetchInterval: 1000, // 1초마다 데이터를 자동으로 새로 고침합니다.
  });

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
    setCheckedMissionsList([]);
    refetch();
  };

  const getRecentMissions = () => {
    return missions.map((mission, index) => (
      <div key={index}>
        <div className="relative flex items-start py-4">
          <div className="min-w-0 flex-1 text-lg leading-6">
            <label className="select-none text-gray-900">
              {mission.content}
            </label>
          </div>
          <div className="ml-3 flex h-6 items-center">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              onChange={(e) => handleChange(e, mission)}
              checked={checkedMissionsList.includes(mission)}
            />
          </div>
        </div>
      </div>
    ));
  };
  return (
    <>
      <div className="px-4 py-2">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              등록된 미션
            </h2>
            <p className="mt-2 text-lg text-gray-700">
              부모님이 등록한 미션을 보여드려요 👍
            </p>
          </div>

          <div className="flex justify-end mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              onClick={handleClick}
              className="text-lg block rounded-md bg-indigo-600 px-3 py-2 text-center text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              포도알 요청
            </button>
          </div>
        </div>

        <legend className="text-2xl font-semibold leading-6 text-gray-900 mt-4">
          미션
        </legend>
        <div className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
          {missions && getRecentMissions()}
        </div>
      </div>

      {showModal && (
        <SuccessModal closeModal={closeModal} message="포도알 요청 완료" />
      )}
      {failModal && (
        <FailModal
          closeModal={closeFailModal}
          message="체크박스를 선택 해주세요."
        />
      )}
    </>
  );
}
