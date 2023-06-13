import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("parent");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSignUp = () => {
    console.log("회원가입");
    // 회원가입 처리 로직 구현
  };

  return (
    <div className="flex items-center justify-center h-screen bg-purple-500">
      <form className="w-96 bg-white rounded-lg p-8">
        <div className="mb-8">
          <div className="flex mb-4">
            <input
              id="parent_tab"
              type="radio"
              name="tab"
              defaultChecked
              className="hidden"
              onClick={() => handleTabClick("parent")}
            />
            <label
              htmlFor="parent_tab"
              className={`px-4 py-2 bg-gray-200 rounded-l cursor-pointer ${
                activeTab === "parent" ? "bg-purple-400 text-white" : ""
              }`}
            >
              부모님
            </label>
            <input
              id="child_tab"
              type="radio"
              name="tab"
              className="hidden"
              onClick={() => handleTabClick("child")}
            />
            <label
              htmlFor="child_tab"
              className={`px-4 py-2 bg-gray-200 rounded-r cursor-pointer ${
                activeTab === "child" ? "bg-purple-400 text-white" : ""
              }`}
            >
              자녀
            </label>
          </div>
          <div>
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
              <Link to="/format/parent">
                <input
                  type="submit"
                  value="로그인"
                  className="px-4 py-2 bg-purple-600 text-white rounded cursor-pointer"
                />
              </Link>
              <Link to="/signup">
                <button
                  type="button"
                  onClick={handleSignUp}
                  className="px-4 py-2 bg-purple-400 text-white rounded cursor-pointer"
                >
                  회원가입
                </button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
