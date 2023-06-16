import React, { useState } from "react";
import { signUp } from "../../api/auth.ts";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("parent");

  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(activeTab);
    try {
      await signUp({
        request: {
          user_id: email,
          password: password,
          user_name: username,
          type: activeTab.toUpperCase(),
        },
      });
      console.log("회원가입완료");
      navigate("/");
    } catch (error) {
      console.log("signup error", error);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-black">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Sign up to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="text"
              className="block text-sm font-medium leading-6 text-white"
            >
              User Name
            </label>
            <div className="mt-2">
              <input
                id="userName"
                name="userName"
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
                className="block pl-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-white"
            >
              User ID
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block pl-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white"
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
                className="block pl-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="mt-6 space-y-6">
            <div className="flex items-center gap-x-3">
              <input
                id="push-parent"
                name="push-type"
                type="radio"
                onClick={() => handleTabClick("parent")}
                className="h-4 w-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
              />
              <label
                htmlFor="push-parent"
                className="block text-sm font-medium leading-6 text-white"
              >
                부모님
              </label>
            </div>
            <div className="flex items-center gap-x-3">
              <input
                id="push-child"
                name="push-type"
                type="radio"
                onClick={() => handleTabClick("child")}
                className="h-4 w-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
              />
              <label
                htmlFor="push-child"
                className="block text-sm font-medium leading-6 text-white"
              >
                자녀
              </label>
            </div>
          </div>
          <div>
            <button
              type="submit"
              onClick={handleSignUp}
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
