import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { missionCreate } from "../../api/mission.ts";

// 미션을 등록하는 컴포넌트
export default function MissionRegister() {
  const [missionContent, setMissionContent] = useState("");
  const queryClient = useQueryClient();

  const handleInputChange = (e) => {
    setMissionContent(e.target.value);
  };

  const mutation = useMutation((params) => missionCreate(params), {
    onSuccess: (data) => {
      console.log("서버 응답:", data);
      // 서버 응답을 처리하는 로직을 추가합니다.
    },
    onError: (error) => {
      console.error("미션 생성 실패:", error);
      // 오류 처리 로직을 추가합니다.
    },
    onSettled: () => {
      // 미션 생성이 완료되면 입력 필드를 초기화합니다.
      setMissionContent("");
      // 기존 데이터를 갱신하기 위해 쿼리를 재요청합니다.
      queryClient.invalidateQueries("missions");
    },
  });

  const handleMissionCreate = () => {
    var date = new Date();
    const createdDate =
      date.getFullYear().toString() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString();

    const params = {
      request: {
        content: missionContent,
        created_date: createdDate,
        completed_date: createdDate,
      },
    };
    mutation.mutate(params);
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
