import React from "react";
import styles from "./Chatting.module.css";
export default function Chatting() {
  return (
    <div>
      <div className={styles.chattingScreen}>
        <div className={styles.chatContainer}>
          <div className={styles.messageContainer}>
            <div className={`${styles.message} ${styles.receivedMessage}`}>
              <div className={styles.avatar}>
                <img src="https://img.lukepeters.me/avatar.jpg" alt="Avatar" />
              </div>
              <div className={styles.messageContent}>
                <strong className={styles.username}>Luke Peters</strong>
                <span className={styles.messageText}>Hello!</span>
              </div>
            </div>
            {/* 다른 받은 메시지 요소들도 위와 같이 추가해줍니다 */}
            <div className={`${styles.message} ${styles.sentMessage}`}>
              <div className={styles.avatar}>
                <img src="http://img.lukepeters.me/jack.jpg" alt="Avatar" />
              </div>
              <div className={styles.messageContent}>
                <strong className={styles.username}>Jack Sparrow</strong>
                <span className={styles.messageText}>
                  Oh hello. Who is this?
                </span>
              </div>
            </div>
            {/* ------------------- */}
            <div className={`${styles.message} ${styles.receivedMessage}`}>
              <div className={styles.avatar}>
                <img src="https://img.lukepeters.me/avatar.jpg" alt="Avatar" />
              </div>
              <div className={styles.messageContent}>
                <strong className={styles.username}>Luke Peters</strong>
                <span className={styles.messageText}>Hello!</span>
              </div>
            </div>
            <div className={`${styles.message} ${styles.sentMessage}`}>
              <div className={styles.avatar}>
                <img src="http://img.lukepeters.me/jack.jpg" alt="Avatar" />
              </div>
              <div className={styles.messageContent}>
                <strong className={styles.username}>Jack Sparrow</strong>
                <span className={styles.messageText}>
                  Oh hello. Who is this?
                </span>
              </div>
            </div>
          </div>

          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Type your message..."
              className={styles.inputField}
            />
            <button className={styles.sendButton}>Send</button>
          </div>
        </div>

        <div className={styles.footer}>
          <span>A pen by </span>
          <a
            href="https://lukepeters.me"
            target="_blank"
            rel="noopener noreferrer"
          >
            Luke Peters
          </a>
        </div>
      </div>
    </div>
  );
}
