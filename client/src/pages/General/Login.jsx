import React, { useState } from "react";
import { signIn } from "../../api/auth.js";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/user.js";
import grapeLogo from "../../icons/mstile-310x310.png";
import FailModal from "../../components/Modal/FailModal";
import InstallAlarm from "./InstallAlarm";

export default function Login({ token }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 저장할 요소 : id, real id, state
  const [user, setUser] = useRecoilState(userState);
  const [openFailModal, setOpenFailModal] = useState(false);

  const navigate = useNavigate();

  const renderInstallPrompt = () => (
    <div className="fixed right-0 m-4">
      <InstallAlarm />
    </div>
  );

  const handleLogIn = async () => {
    // console.log("로그인");
    // console.log(user);
    // console.log(email, password);
    try {
      const userInfo = await signIn({
        request: {
          user_id: email,
          password: password,
          fcm_token: token,
        },
      });

      const params = {
        id: userInfo.data.id,
        user_id: email,
        type: userInfo.data.type,
        name: userInfo.data.user_name,
      };
      setUser(params);
      navigate(
        userInfo.data.type === "PARENT" ? "/format/parent" : "/format/child"
      );
    } catch (error) {
      handleOpenModal();
      console.log("signin error", error);
    }
  };

  const handleOpenModal = () => {
    setOpenFailModal(true);
  };

  const handleCloseModal = () => {
    setOpenFailModal(false);
  };

  // Base64 문자열을 Uint8Array로 변환하는 역할
  const urlB64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  };

  // 권한 요청 후 구독 로직이 실행되며, 구독이 성공적으로 이루어진 경우에만 서버에 구독 정보가 전송됩니다.
  // 이 과정이 끝나면 사용자의 브라우저는 Push 알림을 받을 준비가 된 것
  const handleSub = () => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");

        // 사용자가 허용한 경우에만 push 구독을 시작합니다.
        navigator.serviceWorker.ready
          .then(function (registration) {
            return registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlB64ToUint8Array(
                "YOUR_PUBLIC_VAPID_KEY_HERE"
              ),
            });
          })
          .then(function (subscription) {
            // 구독이 성공한 경우에 서버에 구독 정보를 전송합니다.
            return fetch("/api/push/subscribe", {
              method: "POST",
              body: JSON.stringify(subscription),
              headers: {
                "content-type": "application/json",
              },
            });
          })
          .catch(function (error) {
            console.error("Unable to subscribe to push", error);
          });
      } else {
        console.log("Unable to get permission to notify.");
      }
    });
  };

  return (
    <React.Fragment>
      {/* PWA 설치 버튼 */}
      {renderInstallPrompt()}
      <div className="bg-e1dff0 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-32 w-auto"
            src={grapeLogo}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-semibold leading-9 tracking-tight text-black">
            Poki에 오신 것을 환영합니다.
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="userid"
                className="block text-lg leading-6 text-black"
              >
                아이디
              </label>
              <div className="mt-2">
                <input
                  id="userid"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block pl-2 w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-lg leading-6 text-black"
                >
                  패스워드
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block pl-2 w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleLogIn}
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-lg font-semibold leading-6 text-black shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 text-white"
              >
                로그인
              </button>
              {!openFailModal ? (
                <></>
              ) : (
                <FailModal
                  closeModal={handleCloseModal}
                  message={"아이디/패스워드를 다시 확인해 주세요"}
                />
              )}
            </div>
          </div>

          <p className="mt-10 text-center text-lg text-gray-800">
            가입하지 않으셨나요?{" "}
            <a
              href="/signup"
              className="font-semibold leading-6 text-indigo-800 hover:text-indigo-600"
            >
              회원가입
            </a>
            {/* <button onClick={handleSub}>구독</button> */}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}
