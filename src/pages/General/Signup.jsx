import React from "react";
import { useState } from "react";
import styles from "./Signup.module.css";
// import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("회원가입");
    // 회원가입 처리 로직 구현
  };

  return (
    <div className={styles["login-container"]}>
      <form className={styles["login-form"]} onSubmit={handleSignUp}>
        <div>
          <h1>Sign Up</h1>
          <div className="sign-up-htm">
            <div className="group">
              <label htmlFor="user" className="label">
                Username
              </label>
              <input id="user" type="text" className="input" />
            </div>
            <div className="group">
              <label htmlFor="text" className="label">
                Email Address
              </label>
              <input
                id="text"
                type="text"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="group">
              <label htmlFor="pass" className="label">
                Password
              </label>
              <input
                id="pass"
                type="password"
                className="input"
                data-type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="group">
              <label htmlFor="passconfirm" className="label">
                Repeat Password
              </label>
              <input
                id="passconfirm"
                type="password"
                className="input"
                data-type="password"
              />
            </div>
            <br />
            <div className="group">
              <input type="submit" className="button" value="Sign Up" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
