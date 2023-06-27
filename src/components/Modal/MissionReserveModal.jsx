import { Fragment, useState, setState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { missionCreate, setMissionStatusComplete } from "../../api/mission";

export default function MissionReserveModal({ closeModal, missionContent }) {
  const [open] = useState(true);
  const [reservationDate, setReservationDate] = useState(""); // 예약 날짜 상태

  const setCloseModal = () => {
    closeModal();
  };

  const handleMissionCreate = async () => {
    console.log(reservationDate);
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
          content: missionContent,
          created_date: reservationDate,
          completed_date: createdDate,
        },
      };

      await missionCreate(params);
      setCloseModal();
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
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                {/* <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                    <ExclamationTriangleIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      
                    </Dialog.Title>
                  </div>
                </div> */}

                {/* 제목 */}
                <div className="mb-6">
                  <h2 className="text-xl font-bold">미션 예약하기</h2>
                  <p className="ml-4 mt-2 text-sm text-gray-700">
                    미션을 미리 예약해 보세요.
                  </p>
                </div>

                <div className="flex flex-col">
                  <div className="m-3">미션 내용 : {missionContent}</div>
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
                    onClick={handleMissionCreate}
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
