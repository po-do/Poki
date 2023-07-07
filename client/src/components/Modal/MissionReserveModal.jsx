import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { missionCreate, missionUpdate } from "../../api/mission";

export default function MissionReserveModal({
  closeModal,
  missionContent,
  setMissions,
  Mission,
  flag,
}) {
  const [open] = useState(true);
  const [reservationDate, setReservationDate] = useState(""); // 예약 날짜 상태
  const [reservationContent, setReservationContent] = useState(""); // 예약 날짜 상태
  const setCloseModal = () => {
    closeModal();
  };

  const handleMissionCreate = async () => {
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
          content: missionContent,
          created_date: reservationDate,
          completed_date: createdDate,
        },
      };

      await missionCreate(params);
      setMissions();
      setCloseModal();
    } catch (error) {
      console.log("등록 실패:", error);
    }
  };

  const handleMissionUpdate = async () => {
    try {
      const data = {
        mission_id: Mission.id,
        request: {
          content: reservationContent,
          created_date: reservationDate,
        },
      };

      // Make a POST request to create the wishlist item
      const response = await missionUpdate(data);
      // console.log("수정 완료:", response);
      window.location.reload();
      closeModal();
    } catch (error) {
      console.log("수정 실패:", error);
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
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                {/* 제목 */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold">미션 예약하기</h2>
                  <p className="ml-4 mt-2 text-sm text-gray-700">
                    미션을 예약해 보세요.
                  </p>
                </div>

                <div className="flex flex-col">
                  <div className="m-3">
                    미션 내용 :{" "}
                    {flag ? (
                      <input
                        id="mission-register-one"
                        type="text"
                        className="sm:w-40 px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="내용 수정"
                        value={reservationContent}
                        onChange={(e) => setReservationContent(e.target.value)}
                      />
                    ) : (
                      `${missionContent}`
                    )}
                  </div>

                  <div className="m-3">
                    예약 날짜:
                    <input
                      type="date"
                      className="ml-2 px-2 py-1 border border-gray-300 rounded-md"
                      value={reservationDate}
                      onChange={(e) => setReservationDate(e.target.value)}
                    />
                  </div>
                </div>
                {/* 확인 버튼 */}
                <div className="flex justify-end mt-4">
                  <button
                    className="mr-2 px-4 py-2 bg-indigo-500 text-white rounded-md cursor-pointer"
                    onClick={flag ? handleMissionUpdate : handleMissionCreate}
                  >
                    등록
                  </button>
                  <button
                    className="px-4 py-2 bg-indigo-500 text-white rounded-md cursor-pointer"
                    onClick={setCloseModal}
                  >
                    닫기
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
