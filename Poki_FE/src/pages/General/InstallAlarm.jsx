import React, { useState, useEffect } from "react";
import { MdOutlineInstallMobile } from "react-icons/md";
export default function InstallAlarm() {
  // 사용자에게 설치 프롬프트 띄우기
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // 마운트 시 한 번만 실행
  useEffect(() => {
    // 사용자가 해당 앱 설치하지 않았을 시 발생
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleBeforeInstallPrompt = (event) => {
    event.preventDefault();

    setDeferredPrompt(event);
  };

  const handleInstallClick = () => {
    // 객체 존재 여부 확인
    if (deferredPrompt) {
      // 사용자에게 설치 여부 요청
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
        // 사용자 동의 여부 확인 후 설치 진행
        if (choiceResult.outcome === "accepted") {
          console.log("사용자가 앱 설치를 동의했습니다.");
        } else {
          console.log("사용자가 앱 설치를 동의하지 않았습니다.");
        }
        // 앱 설치를 다시 띄우지 않음
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <div>
      {deferredPrompt && (
        <button
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleInstallClick}
        >
          <MdOutlineInstallMobile
            className="-ml-0.5 h-5 w-5"
            aria-hidden="true"
          />
          Poki 설치
        </button>
      )}
    </div>
  );
}
