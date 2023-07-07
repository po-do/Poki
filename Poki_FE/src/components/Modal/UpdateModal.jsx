import React, { Fragment, useState } from "react";
import { missionUpdate } from "../../api/mission.js";
import { Dialog, Transition } from "@headlessui/react";

export default function UpdateModal({ onClose, item_id }) {
  const [open] = useState(true);
  const [updateMission, setUpdateMission] = useState("");

  const setCloseModal = () => {
    onClose(); // 모달을 닫기 위해 setOpen(false) 호출
  };

  const handleProductNameChange = (e) => {
    setUpdateMission(e.target.value);
  };

  const handleRegister = async () => {
    try {
      var date = new Date();
      const createdDate =
        date.getFullYear().toString() +
        "-" +
        (date.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        date.getDate().toString().padStart(2, "0");
      // Create an object with the data to send to the server
      const data = {
        mission_id: item_id,
        request: {
          content: updateMission,
          created_date: createdDate,
        },
      };

      // Make a POST request to create the wishlist item
      const response = await missionUpdate(data);
      // console.log("수정 완료:", response);
      onClose();
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:max-w-sm sm:p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">내용 수정</h2>
                  <input
                    id="mission-register-one"
                    type="text"
                    className="sm:w-80 px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="내용을 수정하세요"
                    value={updateMission}
                    onChange={handleProductNameChange}
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    className="mr-2 px-4 py-2 bg-indigo-500 text-white rounded-md cursor-pointer"
                    onClick={handleRegister}
                  >
                    수정
                  </button>
                  <button
                    className="px-4 py-2 bg-indigo-500 text-white rounded-md cursor-pointer"
                    onClick={() => setCloseModal()}
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

    // <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
    //   <div className="bg-white p-8 rounded-md shadow-md">
    //     <div className="mb-6">
    //       <h2 className="text-xl font-semibold mb-2">내용 수정</h2>
    //       <input
    //         id="mission-register-one"
    //         type="text"
    //         className="w-96 px-4 py-2 mt-2 border w- border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
    //         placeholder="내용을 수정하세요"
    //         value={updateMission}
    //         onChange={handleProductNameChange}
    //       />
    //     </div>
    //     <div className="flex justify-end gap-3">
    //       <button
    //         className="px-4 py-2 bg-indigo-500 text-white rounded-md cursor-pointer"
    //         onClick={handleRegister}
    //       >
    //         수정
    //       </button>
    //       <button
    //         className="px-4 py-2 bg-indigo-500 text-white rounded-md cursor-pointer"
    //         onClick={onClose}
    //       >
    //         닫기
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
}
