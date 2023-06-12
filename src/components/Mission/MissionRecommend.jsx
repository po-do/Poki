import { React, useState } from "react";
import MissionRecommendModal from './MissionRecommendModal';

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
      <h3>미션 추천</h3>
      <div className="group">
        <br />
        <button>4~6세</button>
        <button>7~9세</button>
        <button>10~12세</button>
        <button>12~13세</button>
        <br />
        <button>사회성</button>
        <button>자립성</button>
        <button>창의성</button>
        <button>책임감</button>
        <button>인내심</button>
        <button>문제해결능력</button>
        <br />
        <div>
          <button onClick={openModal}>추천받기</button>
          {showModal && <MissionRecommendModal onClose={closeModal} />}
        </div>
      </div>
    </>
  );
}
