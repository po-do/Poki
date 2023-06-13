import React from "react";
import MissionRegister from "../../components/Mission/MissionRegister";
// import MissionRecommend from "../../components/Mission/MissionRecommend";
// import MissionRegisterList from "../../components/Mission/MissionRegisterList";
// import MissionComplete from "../../components/Mission/MissionComplete";
// import MissionTempComplete from "../../components/Mission/MissionTempComplete";
// import MissionRegisteredGift from "../../components/Mission/MissionRegisteredGift";

export default function Mission() {
  return (
    <div>
      <h1>미션관리 페이지</h1>
      <MissionRegister />
      {/* <MissionRegisteredGift />
      <button>지급완료</button>
      <button>수정</button>
      <MissionRecommend />
      <MissionRegisterList />
      <MissionTempComplete />
      <MissionComplete /> */}
    </div>
  );
}
