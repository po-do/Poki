import React, { useState } from "react";
// import { missionCreate } from "../api/mission";
// import { useMutation, useQueryClient } from "react-query";

export default function MissionRegister() {
  const [missionContent, setMissionContent] = useState("");
  // const queryClient = useQueryClient();

  const handleInputChange = (e) => {
    setMissionContent(e.target.value);
  };

  // const mutation = useMutation((params) => missionCreate(params), {
  //   onSuccess: (data) => {
  //     console.log("서버 응답:", data);
  //     // 서버 응답을 처리하는 로직을 추가합니다.
  //   },
  //   onError: (error) => {
  //     console.error("미션 생성 실패:", error);
  //     // 오류 처리 로직을 추가합니다.
  //   },
  //   onSettled: () => {
  //     // 미션 생성이 완료되면 입력 필드를 초기화합니다.
  //     setMissionContent("");
  //     // 기존 데이터를 갱신하기 위해 쿼리를 재요청합니다.
  //     queryClient.invalidateQueries("missions");
  //   },
  // });

  const handleMissionCreate = () => {
    console.log("등록");

    // const params = {
    //   request: {
    //     content: missionContent,
    //     created_date: "생성 일자",
    //     completed_date: "",
    //   },
    // };

    // mutation.mutate(params);
  };

  return (
    <>
      <h3 className="text-xl font-bold mb-4">미션 등록</h3>
      <div className="flex items-center">
        <input
          id="mission-register"
          type="text"
          className="input border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 ml-2"
          placeholder="미션을 입력하세요"
          value={missionContent}
          onChange={handleInputChange}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded ml-2"
          onClick={handleMissionCreate}
        >
          등록
        </button>
      </div>
    </>
  );
}
