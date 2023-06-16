import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MissionRegisteredGift from "../../components/Mission/MissionRegisteredGift";
import UserProfile from "../../components/UI/UserProfile";
import RecentMissionList from "../../components/Mission/RecentMissionList";
import { getBoardByUserId, attachBoard } from "../../api/board.ts";
import Grapes from "../../components/UI/Grapes";
export default function ChildMain() {

  const [grape, setGrape] = useState(null);
  const boardQuery = useQuery(["boardState"], () => {
    return getBoardByUserId();
  });

  useEffect(() => {
    if (boardQuery.isSuccess) {
      const fetchedGrape = boardQuery?.data?.data?.grape[0];
      setGrape(fetchedGrape);
    }
  }, [boardQuery.isSuccess, boardQuery.data]);

  async function addGrape() {
    // const prevStatus = grape;
    // // const newStatus = {
    // //   blank: prevStatus?.blank,
    // //   attached_grapes: prevStatus?.attached_grapes + 1,
    // //   total_grapes: prevStatus?.total_grapes,
    // //   deattached_grapes: prevStatus?.deattached_grapes - 1,
    // // };
    const boardStatus = {
      grapeId: 2,
      //request: newStatus,
    };
    // console.log(boardStatus);
    await attachBoard(boardStatus);
  }

  return (
    <>
      <div className="flex">
        <div className="bg-red-100">
          <div className="flex bg-slate-200">
            <Grapes />
            <div>
              <MissionRegisteredGift />
              {/* <p>남은포도송이 개수</p>
              <p>
                {grape?.deattached_grapes}/{grape?.total_grapes}
              </p> */}
              <p>붙일 수 있는 포도알 개수</p>
              <p>{grape?.deattached_grapes}</p>
              <p>붙인 포도알 개수</p>
              <p>{grape?.attached_grapes}</p>
              <p>목표 포도알 개수</p>
              <p>{grape?.blank}</p>
            </div>
          </div>
          <div className="p-5">
            <div className="h-20 bg-slate-200 border-black border rounded-xl">
              <div className="flex">
                <div className="w-10 h-10 bg-black rounded-full"></div>
                <div className="w-10 h-10 bg-black rounded-full"></div>
              </div>
            </div>
            <button
              onClick={() => {
                addGrape();
                // 포도알 이미지가 하나 사라지면서 포도판에 포도알이 하나 붙는 함수를 만들어야할듯
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-md mt-2"
            >
              포도알 붙이기
            </button>
          </div>
        </div>
        <div className="bg-amber-200">
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