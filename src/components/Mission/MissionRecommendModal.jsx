import React from "react";

export default function MissionRecommendModal({ onClose }) {
  const handleRegister = () => {
    console.log("등록완료");
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
            onClick={handleRegister}
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
