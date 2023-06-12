import React from "react";
import styles from "./ChildMain.module.css";
import MissionRegisteredGift from "../../components/Mission/MissionRegisteredGift";
import UserProfile from "../../components/UI/UserProfile";
import RecentMissionList from "../../components/Mission/RecentMissionList";

export default function ChildMain() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles["left-part"]}>
          <div className={styles["podo-dashboard"]}>
            <div>
              <img
                src="https://t1.daumcdn.net/cfile/tistory/991827345BF5441310"
                alt=""
              />
            </div>
            <div>
              <MissionRegisteredGift />
              <p>남은포도송이 개수</p>
              <p>5/10</p>
              <p>남은 포도알 개수</p>
              <p>50/100</p>
              <p>받은 포도알 개수</p>
              <p>3개</p>
            </div>
          </div>
          <div>
            <p>받은 포도알</p>
            <p>받은 포도알 개수 이미지로 보여주기</p>
          </div>
        </div>
        <div className={styles["right-part"]}>
          <div>
            <UserProfile />
          </div>
          <div>
            <RecentMissionList />
            <button>포도알 요청</button>
          </div>
        </div>
      </div>
    </>
  );
}
