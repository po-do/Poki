import React from "react";
import styles from "./MissionRecommendModal.module.css";

export default function MissionRecommendModal({ onClose }) {
  const handleRegister = () => {
    // 여기에서 등록 버튼을 클릭할 때 실행할 동작을 정의합니다.
    // 예를 들어, 입력된 상품명과 URL을 서버로 전송하거나 상태를 업데이트할 수 있습니다.
    // onRegister(productName, url);
    // onClose();
    console.log("등록완료");
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <div className={styles.content}>
          <h2>추천 미션</h2>
          <div className={styles.missionSection}>
            <div className={styles.missionTitle}>
              <input type="checkbox" name="" id="check" />
              <h4>자신의 옷 정리하고 걸어두기</h4>
            </div>
            <p>
              자녀에게 자신의 옷을 정리하고 걸어두는 미션을 주어 자립성을 기를
              수 있습니다. 자녀는 옷을 정리하고 옷걸이에 매달아두는 과정을
              배우고 스스로 처리할 수 있도록 독려됩니다.
            </p>
          </div>
          <div className={styles.missionSection}>
            <div className={styles.missionTitle}>
              <input type="checkbox" name="" id="check" />
              <h4>자신의 옷 정리하고 걸어두기</h4>
            </div>
            <p>
              자녀에게 자신의 옷을 정리하고 걸어두는 미션을 주어 자립성을 기를
              수 있습니다. 자녀는 옷을 정리하고 옷걸이에 매달아두는 과정을
              배우고 스스로 처리할 수 있도록 독려됩니다.
            </p>
          </div>
          <button onClick={handleRegister}>등록</button>
        </div>
      </div>
    </div>
  );
}
