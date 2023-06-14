import React, { useEffect, useState } from "react";
import styles from "./ChildMain.module.css";
import { useQuery } from "@tanstack/react-query";
import MissionRegisteredGift from "../../components/Mission/MissionRegisteredGift";
import UserProfile from "../../components/UI/UserProfile";
import RecentMissionList from "../../components/Mission/RecentMissionList";
import { getBoardByUserId, updateBoard } from "../../api/board.ts";

export default function ChildMain() {
  const [grape, setGrape] = useState(null);
  const userId = 2;
  const boardQuery = useQuery(["boardState", userId], () => {
    return getBoardByUserId();
  });

  useEffect(() => {
    if (boardQuery.isSuccess) {
      const fetchedGrape = boardQuery?.data?.data?.grape[0];
      setGrape(fetchedGrape);
    }
  }, [boardQuery.isSuccess, boardQuery.data]);

  const addGrape = async () => {
    const prevStatus = grape;
    const newStatus = {
      blank: prevStatus?.blank,
      attached_grapes: prevStatus?.attached_grapes + 1,
      total_grapes: prevStatus?.total_grapes,
      deattached_grapes: prevStatus?.deattached_grapes - 1,
    };
    const boardStatus = {
      grapeId: 1,
      request: newStatus,
    };
    await updateBoard(boardStatus);
  };
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
              {/* <p>남은포도송이 개수</p>
              <p>
                {grape?.deattached_grapes}/{grape?.total_grapes}
              </p> */}
              <p>붙일 수 있는 포도알 개수</p>
              <p>{grape?.deattached_grapes}</p>
              <p>받은 포도알 개수</p>
              <p>{grape?.total_grapes}</p>
              <p>목표 포도알 개수</p>
              <p>{grape?.blank}</p>
            </div>
          </div>
          <div>
            {/* <p>받은 포도알 개수 이미지로 보여주기</p> */}
            <button
              onClick={addGrape}
              className="px-4 py-2 bg-purple-600 text-white rounded-r-md"
            >
              포도알 붙이기
            </button>
          </div>
        </div>
        <div className={styles["right-part"]}>
          <div>
            <UserProfile />
          </div>
          <div>
            <RecentMissionList />
          </div>
        </div>
      </div>
    </>
  );
}
