import React from "react";
import MissionRegister from "../../components/Mission/MissionRegister";
import MissionRegisterList from "../../components/Mission/MissionRegisterList";
import MissionTempComplete from "../../components/Mission/MissionTempComplete";
import MissionAi from "../../components/Mission/MissionAi";

export default function Mission() {
  return (
    <div className="relative bg-white lg:pb-12">
      <div className="px-12 py-7">
        <p className="mt-2 text-3xl font-semibold tracking-tight text-black sm:text-4xl">
          아이의 미션 목록
        </p>
      </div>
      <div className="lg:mx-32 sm:mx-8 px-8 py-4 sm:px-6 sm:py-4">
        <div className="p-6 rounded-2xl border-4">
          <MissionRegister />
        </div>
        <div className="p-6 rounded-2xl border-4 mt-5">
          <MissionAi />
        </div>
        <div className="p-6 rounded-2xl border-4 mt-5">
          <MissionRegisterList />
        </div>
        <div className="p-6 rounded-2xl border-4 mt-5">
          <MissionTempComplete />
        </div>

        {/* <div className="p-6 rounded-2xl border-4 mt-5">
          <MissionComplete />
        </div> */}
      </div>
    </div>
  );
}
