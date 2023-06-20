import { React, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { missionCreate } from "../../api/mission.js";

// 배치되어있는 버튼을 선택해서 선택한 키워드로 GPT에게 질문하여 나온 답변을 가공하여 보여주는 컴포넌트
export default function MissionRecommendModal({ onClose }) {
  const [missionContent, setMissionContent] = useState("");
  const queryClient = useQueryClient();
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

    const params = {
      request: {
        content: missionContent,
        created_date: "생성 일자",
        completed_date: "",
      },
    };

    mutation.mutate(params);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-96 bg-white rounded-lg p-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">추천 미션</h2>
          <div className="mb-4">
            <div className="flex items-center">
              <input type="checkbox" name="" id="check" className="mr-2" />
              <h4 className="font-bold">자신의 옷 정리하고 걸어두기</h4>
            </div>
            <p className="text-gray-700">
              자녀에게 자신의 옷을 정리하고 걸어두는 미션을 주어 자립성을 기를
              수 있습니다. 자녀는 옷을 정리하고 옷걸이에 매달아두는 과정을
              배우고 스스로 처리할 수 있도록 독려됩니다.
            </p>
          </div>
          <div className="mb-4">
            <div className="flex items-center">
              <input type="checkbox" name="" id="check" className="mr-2" />
              <h4 className="font-bold">자신의 옷 정리하고 걸어두기</h4>
            </div>
            <p className="text-gray-700">
              자녀에게 자신의 옷을 정리하고 걸어두는 미션을 주어 자립성을 기를
              수 있습니다. 자녀는 옷을 정리하고 옷걸이에 매달아두는 과정을
              배우고 스스로 처리할 수 있도록 독려됩니다.
            </p>
          </div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleMissionCreate}
          >
            등록
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
