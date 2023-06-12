import React from "react";
import { useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("로그인 시도~");
    // 로그인 처리 로직 구현
    // 예를 들어, 서버로 API 요청을 보내고 인증을 처리하는 등의 작업을 수행할 수 있습니다.
  };

  const handleSignUp = () => {
    console.log("회원가입");
    // 회원가입 처리 로직 구현
  };

  return (
    <div className={styles["login-container"]}>
      <form className={styles["login-form"]} onSubmit={handleSubmit}>
        <div>
          <div className={styles["tab-box"]}>
            <input id="parent_tab" type="radio" name="tab" defaultChecked />
            <label htmlFor="parent_tab" className="tab">
              부모님
            </label>
            <input id="child_tab" type="radio" name="tab" />
            <label htmlFor="child_tab">자녀</label>
          </div>
          <div>
            <div>
              <div className={styles["id-box"]}>
                <label htmlFor="user">ID</label>
                <input
                  id="user"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={styles["pass-box"]}>
                <label htmlFor="pass">Password</label>
                <input
                  id="pass"
                  type="password"
                  data-type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={styles.footer}>
                <input type="submit" value="로그인" />
                <Link to="/signup">
                  <button type="button" onClick={handleSignUp}>
                    회원가입
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
