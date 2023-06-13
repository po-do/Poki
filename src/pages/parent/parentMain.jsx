import React from "react";
import styles from "./ParentMain.module.css";
import Calender from "../../components/UI/CalenderElement";
import { useQuery } from "@tanstack/react-query";
import MissionRegisterList from "../../components/Mission/MissionRegisterList";

export default function ParentMain() {
  const podo = useQuery(['boardState'], )

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
              <p>남은포도송이 개수~</p>
              <p>5/10</p>
              <p>남은 포도알 개수</p>
              <p>50/100</p>
            </div>
          </div>
          <div>
            <MissionRegisterList />
          </div>
        </div>
        <div className={styles["right-part"]}>
          <div>
            <Calender />
          </div>
          <div>
            <p>아이의 위시 리스트</p>
            <ul>
              <li>카카오 인형</li>
              <li>카카오 인형</li>
              <li>카카오 인형</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
