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
      <form className="w-full lg:col-span-5 lg:pt-2">
        <div className="flex gap-x-4">
          <input
            id="code"
            name="code"
            type="text"
            autoComplete="password"
            required
            className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
            placeholder="미션 입력"
          />
          <button
            type="submit"
            className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            미션 등록
          </button>
        </div>
      </form>
    </>
  );
}
