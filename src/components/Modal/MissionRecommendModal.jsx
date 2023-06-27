import { React, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import FailModal from "./FailModal";
import { missionCreate } from "../../api/mission.js";

function PickedMission(...classes) {
  return classes.filter(Boolean).join(" ");
}

// 배치되어있는 버튼을 선택해서 선택한 키워드로 GPT에게 질문하여 나온 답변을 가공하여 보여주는 컴포넌트
export default function MissionRecommendModal({ onClose, result }) {
  const [selected, setSelected] = useState(result[0]);
  const [showFailModal, setShowFailModal] = useState(false);

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

  // const handleMissionCreate = () => {

  //   const params = {
  //     request: {
  //       content: missionContent,
  //       created_date: "생성 일자",
  //       completed_date: "",
  //     },
  //   };

  //   mutation.mutate(params);
  // };
  // console.log(selected);

  // 실패 시 모달
  const openFailModal = async () => {
    setShowFailModal(true);
  };

  const closeFailModal = () => {
    setShowFailModal(false);
  };

  const handleModal = async () => {
    try {
      var date = new Date();
      const createdDate =
        date.getFullYear().toString() +
        "-" +
        (date.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        date.getDate().toString();

      const params = {
        request: {
          content: selected,
          created_date: createdDate,
          completed_date: createdDate,
        },
      };

      await missionCreate(params);
      console.log("등록 성공");
      
      // 홈페이지 새로고침
      window.location.reload();

      onClose();
    } catch (error) {
      console.log("등록 실패:", error);
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md shadow-md">
        <div className="mb-6">
          <h2 className="text-xl font-bold">선물 추천받기</h2>
        </div>

        {/* 추천 미션 */}
        <div>
          <RadioGroup value={selected} onChange={setSelected}>
            <RadioGroup.Label className="sr-only">
              Privacy setting
            </RadioGroup.Label>
            <div className="-space-y-px rounded-md bg-white">
              {console.log("missionrecommend", result)}
              {result.map((setting, settingIdx) => (
                <RadioGroup.Option
                  key={setting}
                  value={setting}
                  className={({ checked }) =>
                    PickedMission(
                      settingIdx === 0 ? "rounded-tl-md rounded-tr-md" : "",
                      settingIdx === result.length - 1
                        ? "rounded-bl-md rounded-br-md"
                        : "",
                      checked
                        ? "z-10 border-indigo-200 bg-indigo-50"
                        : "border-gray-200",
                      "relative flex cursor-pointer border p-4 focus:outline-none"
                    )
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <span
                        className={PickedMission(
                          checked
                            ? "bg-indigo-600 border-transparent"
                            : "bg-white border-gray-300",
                          active ? "ring-2 ring-offset-2 ring-indigo-600" : "",
                          "mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center"
                        )}
                        aria-hidden="true"
                      >
                        <span className="rounded-full bg-white w-1.5 h-1.5" />
                      </span>
                      <span className="ml-3 flex flex-col">
                        <RadioGroup.Label
                          as="span"
                          className={PickedMission(
                            checked ? "text-indigo-900" : "text-gray-900",
                            "block text-sm font-medium"
                          )}
                        ></RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className={PickedMission(
                            checked ? "text-indigo-700" : "text-gray-500",
                            "block text-sm"
                          )}
                        >
                          {setting}
                        </RadioGroup.Description>
                      </span>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* 버튼 */}
        <div className="flex justify-end">
          <button
            className="mr-3 rounded-md bg-indigo-500 mt-4 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleModal}
          >
            미션 등록
          </button>

          {/* 모달 확인 */}
          <button
            className="rounded-md bg-indigo-500 mt-4 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={onClose}
          >
            닫기
          </button>
        </div>

        {/* 실패 모달 */}
        {showFailModal && (
          <FailModal
            closeModal={closeFailModal}
            message={"추천 미션을 선택해 주세요"}
          />
        )}
      </div>
    </div>
  );
}
