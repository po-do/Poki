import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/user";
import FailModal from "../../components/Modal/FailModal";
import { connectUserCode, getConnectedUser } from "../../api/auth.js";

export default function CodeConnectModal({ closeModal }) {
  const [open] = useState(true);
  const [inputData, setInputData] = useState("");
  const [inputReadOnly, setInputReadOnly] = useState(false);
  const [registCodeFailModal, setRegistCodeFailModal] = useState(false);
  const [failModal, setFailModal] = useState(false);

  const openFailModal = () => {
    setFailModal(true);
  };

  const closeFailModal = () => {
    setFailModal(false);
  };

  const openCodeFailModal = () => {
    setRegistCodeFailModal(true);
  };

  const closeCodeFailModal = () => {
    setRegistCodeFailModal(false);
  };

  // recoil
  const user = useRecoilValue(userState);

  const setCloseModal = () => {
    closeModal(); // 모달을 닫기 위해 setOpen(false) 호출
  };

  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const handleRegistCode = async () => {
    if (inputData !== "") {
      const params = {
        request: {
          child_id: user.user_id,
          connection_code: inputData,
        },
      };
      const flag = await connectUserCode(params);
      // console.log(flag.connected);
      if (flag.connected === true) {
        // console.log("등록 성공");
        setCloseModal();
        // openRegistCodeModal();
        // force a page reload
      } else {
        // console.log("입력 코드가 틀렸다는 모달 나와야함");
        // 입력 코드가 틀렸다는 모달 나와야함
        openCodeFailModal();
      }
    } else {
      // console.log("입력값이 없다는 모달 나와야함");
      // 입력값이 없다는 모달 나와야함
      openFailModal();
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
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                    <ExclamationTriangleIcon
                      className="h-6 w-6 text-indigo-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      <p className="mb-4">
                        코드를 입력하여 부모님과 연결해 보세요.
                      </p>
                      {/* 코드등록 */}
                      <div className="mt-auto">
                        <div className="w-full max-w-md lg:col-span-5 lg:pt-2">
                          <div className="flex gap-x-4">
                            <input
                              id="code"
                              name="code"
                              type="text"
                              required
                              className={`min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                              placeholder="코드 입력"
                              readOnly={inputReadOnly} // readonly 속성 추가
                              onChange={handleInputChange}
                            />
                            <button
                              type="submit"
                              className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              onClick={handleRegistCode}
                            >
                              등록
                            </button>
                          </div>
                        </div>
                      </div>
                    </Dialog.Title>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
          {failModal && (
            <FailModal
              closeModal={closeFailModal}
              message="입력값이 없습니다."
            />
          )}
          {registCodeFailModal && (
            <FailModal
              closeModal={closeCodeFailModal}
              message="코드가 틀렸습니다."
            />
          )}
        </div>
      </Dialog>
    </Transition.Root>
  );
}
