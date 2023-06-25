import React from "react";
import MissionRegister from "../../components/Mission/MissionRegister";
import MissionRegisterList from "../../components/Mission/MissionRegisterList";
import MissionComplete from "../../components/Mission/MissionComplete";
import MissionTempComplete from "../../components/Mission/MissionTempComplete";

export default function Mission() {
  return (
    <div className="bg-white mx-auto max-w-xl px-4 lg:max-w-7xl lg:px-8 lg:pb-12">
      <div className="px-12 py-7">
        <p className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-4xl">
          아이의 미션 목록
        </p>
      </div>
      <div className="p-6 rounded-2xl border-4">
        <MissionRegister />
      </div>

      <div className="p-6 rounded-2xl border-4 mt-10">
        <MissionRegisterList />
      </div>
      <div className="p-6 rounded-2xl border-4 mt-10">
        <MissionTempComplete />
      </div>

      <div className="mt-10 p-6 rounded-2xl border-4">
        <MissionComplete />
      </div>
    </div>
  );
}
