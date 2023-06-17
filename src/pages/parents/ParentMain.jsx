import React from "react";
import styles from "./ParentMain.module.css";
import { useQuery } from "@tanstack/react-query";
import { getBoardByUserId } from "../../api/board.ts";
import MissionRegisterList from "../../components/Mission/MissionRegisterList";
// import { useRecoilValue } from "recoil";
// import { userState } from "../../recoil";

export default function ParentMain() {
  const userId = 2;
  // const user = useRecoilValue(userState);
  const boardQuery = useQuery(["boardState"], () => {
    return getBoardByUserId();
  });

  const grape = boardQuery?.data?.data?.grape[0];
  console.log(grape?.total_grapes);

  return (
    <>
      {/* {user} */}
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
              <p>붙일 수 있는 포도알 개수</p>
              <p>{grape?.deattached_grapes}</p>
              <p>붙인 포도알 개수</p>
              <p>{grape?.attached_grapes}</p>
              <p>목표 포도알 개수</p>
              <p>{grape?.blank}</p>
            </div>
          </div>
          <div>
            <MissionRegisterList />
          </div>
        </div>
        <div className={styles["right-part"]}>
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