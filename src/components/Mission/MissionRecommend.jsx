import React, { useState } from "react";
import MissionRecommendModal from "./MissionRecommendModal";

// 배치되어있는 버튼을 선택해서 선택한 키워드로 GPT에게 질문하기를 할수있는 컴포넌트
export default function MissionRecommend() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <h3 className="text-xl font-bold mb-4">미션 추천</h3>
      <div className="space-y-2">
        <div className="space-x-2">
          < className="px-button4 py-2 bg-blue-500 text-white rounded">
            4~6세
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            7~9세
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            10~12세
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            12~13세
          </button>
        </div>
        <div className="space-x-2">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            사회성
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            자립성
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            창의성
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            책임감
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            인내심
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            문제해결능력
          </button>
        </div>
        <div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={openModal}
          >
            추천받기
          </button>
          {showModal && <MissionRecommendModal onClose={closeModal} />}
        </div>
      </div>
    </>
  );
}
