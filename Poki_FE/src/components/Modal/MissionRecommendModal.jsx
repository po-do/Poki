import { React, Fragment, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import FailModal from "./FailModal";
import { missionCreate } from "../../api/mission.js";
import { Dialog, Transition } from "@headlessui/react";

function PickedMission(...classes) {
  return classes.filter(Boolean).join(" ");
}

// 배치되어있는 버튼을 선택해서 선택한 키워드로 GPT에게 질문하여 나온 답변을 가공하여 보여주는 컴포넌트
export default function MissionRecommendModal({ onClose, result }) {
  const [open] = useState(true);
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

  const setCloseModal = () => {
    onClose(); // 모달을 닫기 위해 setOpen(false) 호출
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
        date.getDate().toString().padStart(2, "0");

      const params = {
        request: {
          content: selected,
          created_date: createdDate,
          completed_date: createdDate,
        },
      };

      await missionCreate(params);
      // console.log("등록 성공");

      // 홈페이지 새로고침
      window.location.reload();

      onClose();
    } catch (error) {
      console.log("등록 실패:", error);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setCloseModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center lg:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:tr    anslate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 lg:max-w-sm sm:p-6 lg:max-w-sm">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">미션 추천 받기</h2>
                </div>
                {/* 추천 미션 */}
                <div>
                  <RadioGroup value={selected} onChange={setSelected}>
                    <RadioGroup.Label className="sr-only">
                      Privacy setting
                    </RadioGroup.Label>
                    <div className="-space-y-px rounded-md bg-white">
                      {result.map((setting, settingIdx) => (
                        <RadioGroup.Option
                          key={setting}
                          value={setting}
                          className={({ checked }) =>
                            PickedMission(
                              settingIdx === 0
                                ? "rounded-tl-md rounded-tr-md"
                                : "",
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
                                  active
                                    ? "ring-2 ring-offset-2 ring-indigo-600"
                                    : "",
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
                                    checked
                                      ? "text-indigo-900"
                                      : "text-gray-900",
                                    "block text-sm font-semibold"
                                  )}
                                ></RadioGroup.Label>
                                <RadioGroup.Description
                                  as="span"
                                  className={PickedMission(
                                    checked
                                      ? "text-indigo-700"
                                      : "text-gray-500",
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

                <div className="flex justify-end mt-4">
                  <button
                    className="mr-2 px-4 py-2 bg-indigo-500 text-white rounded-md cursor-pointer"
                    onClick={handleModal}
                  >
                    미션 등록
                  </button>
                  <button
                    className="px-4 py-2 bg-indigo-500 text-white rounded-md cursor-pointer"
                    onClick={setCloseModal}
                  >
                    닫기
                  </button>

                  {/* 실패 모달 */}
                  {showFailModal && (
                    <FailModal
                      closeModal={closeFailModal}
                      message={"추천 미션을 선택해 주세요"}
                    />
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
