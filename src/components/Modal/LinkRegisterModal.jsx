import { React, useState } from "react";
import styles from "./LinkRegisterModal.module.css";

export default function LinkRegister({ onClose }) {
  const [productName, setProductName] = useState("");
  const [url, setUrl] = useState("");

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

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
          <h2>링크 등록</h2>
          <input
            id="mission-register-one"
            type="text"
            className="input"
            placeholder="상품명을 입력하세요"
            value={productName}
            onChange={handleProductNameChange}
          />
          <input
            id="mission-register-two"
            type="text"
            className="input"
            placeholder="URL을 입력하세요"
            value={url}
            onChange={handleUrlChange}
          />
          <button onClick={handleRegister}>등록</button>
        </div>
      </div>
    </div>
  );
}
