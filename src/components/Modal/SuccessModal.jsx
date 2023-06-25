import { CheckIcon } from "@heroicons/react/24/outline";

export default function SuccessModal({ closeModal, message }) {

  const setCloseModal = () => {
    closeModal(); // To close the modal, you can call closeModal()
  };

  return (
    <div className="bg-gray-500 bg-opacity-75 transition-opacity absolute inset-0 flex items-center justify-center">
      <div className="bg-white rounded-lg px-4 pb-4 pt-5 text-left shadow-xl sm:p-6 sm:w-full sm:max-w-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <div className="text-base font-semibold leading-6 text-gray-900">
            {message}
          </div>
        </div>
        <div className="mt-5 sm:mt-6">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={setCloseModal}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}