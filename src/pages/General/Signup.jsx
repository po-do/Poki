import React, { useState } from "react";
import { signUp } from "../../api/auth.ts";

export default function Signup() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("parent");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("회원가입");
    // 회원가입 처리 로직 구현

    try {
      await signUp({
        request: {
          user_id: email,
          password: password,
          user_name: username,
          type: activeTab.toUpperCase(),
        },
      });
    } catch (error) {
      console.log("signup error", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-purple-500">
      <form className="w-96 bg-white rounded-lg p-8">
        <div>
          <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
          <div className="space-y-4">
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
            <div className="flex flex-col">
              <label htmlFor="user" className="text-lg font-medium">
                Username
              </label>
              <input
                id="user"
                type="text"
                className="input border"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="text" className="text-lg font-medium">
                Email Address
              </label>
              <input
                id="text"
                type="text"
                className="input  border"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="pass" className="text-lg font-medium">
                Password
              </label>
              <input
                id="pass"
                type="password"
                className="input  border"
                data-type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="passconfirm" className="text-lg font-medium">
                Repeat Password
              </label>
              <input
                id="passconfirm"
                type="password"
                className="input border"
                data-type="password"
              />
            </div>
            <div className="mt-8">
              <input
                type="submit"
                className="button bg-purple-600 text-white font-medium py-2 px-4 rounded cursor-pointer"
                value="Sign Up"
                onClick={handleSignUp}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
