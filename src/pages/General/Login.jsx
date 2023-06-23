import React, { useState } from "react";
import { signIn } from "../../api/auth.js";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/user.js";
import grapeLogo from "../../icons/mstile-310x310.png";
import FailModal from "../../components/Modal/FailModal";
import InstallAlarm from "./InstallAlarm";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 저장할 요소 : id, real id, state
  const [user, setUser] = useRecoilState(userState);
  const [openFailModal, setOpenFailModal] = useState(false);

  const navigate = useNavigate();

  const handleLogIn = async () => {
    console.log("로그인");
    console.log(user);
    // console.log(email, password);
    try {
      const userInfo = await signIn({
        request: {
          user_id: email,
          password: password,
        },
      });

      const params = {
        id: userInfo.data.id,
        user_id: email,
        type: userInfo.data.type,
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
  }

  const handleCloseModal = () => {
    setOpenFailModal(false);

  }

  return (
    <>
      <div className="fixed right-0 m-4">
        <InstallAlarm />
      </div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-indigo-300">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-32 w-auto"
            src={grapeLogo}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="userid"
                className="block text-sm font-medium leading-6 text-black"
              >
                Email address
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
                  className="block text-sm font-medium leading-6 text-black"
                >
                  Password
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
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 text-white"
              >
                Sign in
              </button>
              {!openFailModal ?
                <></>
                : <FailModal closeModal={handleCloseModal} message={"아이디/패스워드를 다시 확인해 주세요"}/>
              }
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-800">
            가입하지 않으셨나요?{" "}
            <a
              href="/signup"
              className="font-semibold leading-6 text-indigo-800 hover:text-indigo-600"
            >
              회원가입
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
