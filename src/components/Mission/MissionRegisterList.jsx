import { React, useEffect, useState } from "react";
import { newMissionRead, missionDelete } from "../../api/mission.js";
import FailModal from "../../components/Modal/FailModal";
import UpdateModal from "../Modal/UpdateModal.jsx";

export default function MissionRegisterList() {
  const [missions, setMissions] = useState([]);
  const [selectedMission, setSelectedMission] = useState(null);
  const [failModal, setFailModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const [checkedMissionsId, setCheckedMissionsId] = useState([]);
  // const [checkedMissionsList, setCheckedMissionsList] = useState([]);

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

    setMissions(missionsData);
  };

  // 미션수정 ===================
  const handleChange = async (item) => {
    //   if (e.target.checked) {
    //     setCheckedMissionsId([...checkedMissionsId, mission.id]);
    //     setCheckedMissionsList([...checkedMissionsList, mission]);
    //   } else {
    //     setCheckedMissionsId(checkedMissionsId.filter((id) => id !== mission.id));
    //     setCheckedMissionsList(checkedMissionsList.filter((m) => m === mission));
    //     // checkedMissionsList에서 채크 안된놈들 지우기
    //   }
    setSelectedMission(item);
    openModal();
  };

  // 미션삭제 ===================
  const handleDelete = async (mission_id) => {
    const params = {
      mission_id: mission_id,
    };

    await missionDelete(params);

    openFailModal();
    // await Promise.all(
    //   checkedMissionsId.map((misvsionId) =>
    //     missionDelete({ mission_id: missionId })
    //   )
    // );
    // setCheckedMissionsId([]);
    // setMissions([]);
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
        <div className="mt-8 overflow-y-auto max-h-60">
          <div className="-mx-4 -my-2  sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      등록된 미션
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {missions.map((item) => (
                    <tr key={item.id} className="flex justify-between">
                      <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 overflow-hidden text-overflow-ellipsis whitespace-nowrap">
                        {item.content}
                      </td>
                      <td className="flex whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium gap-2">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 font-bold"
                          onClick={() => handleChange(item.id)}
                        >
                          수정
                        </button>
                        <button
                          className="text-indigo-600 hover:text-indigo-900 font-bold ml-2"
                          onClick={() => handleDelete(item.id)}
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {failModal && (
        <FailModal closeModal={closeFailModal} message="삭제되었습니다." />
      )}
      {showModal ? (
        <UpdateModal onClose={closeModal} item_id={selectedMission} />
      ) : (
        <></>
      )}
    </>
  );
}