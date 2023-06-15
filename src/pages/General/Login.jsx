import React, { useState } from "react";
import { signIn } from "../../api/auth.ts";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/user.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 저장할 요소 : id, real id, state
  const [user, setUser] = useRecoilState(userState);

  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLogIn = async () => {
    console.log("로그인");

    try {
      const userInfo = await signIn({
        request: {
          user_id: email,
          password: password,
        },
      });

      // 상태관리
      const params = {
        // id: userInfo.data.id,
        user_id: email,
        type: userInfo.data.type,
      };

      setUser(params);

      navigate(`/format/${userInfo.data.type}`);
    } catch (error) {
      console.log("signin error", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-purple-500">
      <form className="w-96 bg-white rounded-lg p-8">
        <div className="mb-8">
          <div>
            {/* ID 입력 */}
            <div className="mb-4">
              <div>
                <label htmlFor="user" className="block mb-2 font-medium">
                  ID
                </label>
                <input
                  id="user"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              {/* 패스워드 입력 */}
              <div className="mt-4">
                <label htmlFor="pass" className="block mb-2 font-medium">
                  Password
                </label>
                <input
                  id="pass"
                  type="password"
                  data-type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleLogIn}
                className="px-4 py-2 bg-purple-400 text-white rounded cursor-pointer"
              >
                로그인
              </button>

              <button
                type="button"
                onClick={handleSignUp}
                className="px-4 py-2 bg-purple-400 text-white rounded cursor-pointer"
              >
                회원가입
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
