import React from "react";
import MissionRegister from "../../components/Mission/MissionRegister";
import MissionRegisterList from "../../components/Mission/MissionRegisterList";
import MissionComplete from "../../components/Mission/MissionComplete";
import MissionTempComplete from "../../components/Mission/MissionTempComplete";
export default function Mission() {
  return (

  <div className="bg-white mx-auto max-w-1xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <div className="">
      <MissionRegister />
    </div>
    <div className="flex gap-96 mt-10">
      <div className="">
        <MissionRegisterList gap-y-10/>
      </div>
      <div className="">
        <MissionTempComplete />
      </div>
    </div>
    <div className="mt-10">
      <MissionComplete />
    </div>
  </div>
  );
}
