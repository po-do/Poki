import React from "react";

export default function MissionRegister() {
  return (
    <>
      <h3>미션 등록</h3>
      <div className="group">
        <input
          id="mission-register"
          type="text"
          className="input"
          placeholder="미션을 입력하세요"
        />
        <button>등록</button>
      </div>
    </>
  );
}
