import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { missionCreate } from "../../api/mission.js";
import SuccessModal from "../../components/Modal/SuccessModal";
import FailModal from "../../components/Modal/FailModal";
import MissionReserveModal from "../../components/Modal/MissionReserveModal.jsx";

export default function MissionRegister() {
  const [missionContent, setMissionContent] = useState("");
  const queryClient = useQueryClient();
  const [missionRegistModal, setMissionRegistModal] = useState(false);
  const [missionReserveModal, setmissionReserveModal] = useState(false);
  const [failModal, setFailModal] = useState(false);

  const openMissionRegistModal = () => {
    setMissionRegistModal(true);
  };

  const closeMissionRegistModal = () => {
    setMissionRegistModal(false);
  };

  const openMissionReserveModal = () => {
    setmissionReserveModal(true);
  };

  const closeMissionReserveModal = () => {
    setmissionReserveModal(false);
  };

  const openFailModal = () => {
    setFailModal(true);
  };

  const closeFailModal = () => {
    setFailModal(false);
  };

  const handleInputChange = (e) => {
    setMissionContent(e.target.value);
  };

  const setMission = () => {
    setMissionContent("");
  };

  const handleButtonClick = () => {
    if (missionContent === "") {
      openFailModal();
    } else {
      openMissionRegistModal();
      handleMissionCreate();
      setMission();
    }
  };

  const handleReserveClick = () => {
    if (missionContent === "") {
      openFailModal();
    } else {
      // 예약 일자
      openMissionReserveModal();
    }
  };

  const mutation = useMutation((params) => missionCreate(params), {
    onSuccess: (data) => {
      // console.log("서버 응답:", data);
    },
    onError: (error) => {
      console.error("미션 생성 실패:", error);
    },
    onSettled: () => {
      setMissionContent("");
      queryClient.invalidateQueries("missions");
    },
  });

  const handleMissionCreate = async () => {
    try {
      var date = new Date();
      const createdDate =
        date.getFullYear().toString() +
        "-" +
        (date.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        date.getDate().toString().padStart(2, "0");

      const params = {
        request: {
          content: missionContent,
          created_date: createdDate,
          // completed_date: createdDate,
        },
      };

      mutation.mutate(params);
    } catch (error) {
      console.log("등록 실패:", error);
    }
  };

  return (
    <>
      <div>
        <h3 className="text-2xl font-semibold mb-4">미션 등록</h3>
        <p className="ml-4 mt-2 text-lg text-gray-700 mb-4">
          아이가 수행할 미션을 등록해 주세요. 미래에 수행할 미션도 예약할 수
          있습니다.
        </p>
      </div>

      <div className="w-full lg:col-span-5 lg:pt-2">
        <div className="flex gap-x-4">
          <input
            id="code"
            name="code"
            type="text"
            value={missionContent}
            onChange={handleInputChange}
            className="min-w-0 flex-auto rounded-md border-0 ml-4 px-3.5 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
            placeholder="미션 입력"
          />

          <button
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-lg text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleButtonClick}
          >
            미션 등록
          </button>

          <button
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-lg text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleReserveClick}
          >
            미션 예약
          </button>
        </div>
      </div>
      {/* Modal Area */}
      {missionRegistModal && (
        <SuccessModal
          closeModal={closeMissionRegistModal}
          message="미션등록 완료"
        />
      )}

      {missionReserveModal && (
        <MissionReserveModal
          closeModal={closeMissionReserveModal}
          missionContent={missionContent}
          setMissions={setMission}
        />
      )}

      {failModal && (
        <FailModal closeModal={closeFailModal} message="입력값이 없습니다." />
      )}
    </>
  );
}
