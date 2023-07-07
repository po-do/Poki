import React, { useEffect, useState } from "react";
import Grapes from "../../components/UI/ChildGrapes";
// 폭죽넣기
import FireWork from '../../components/Modal/FireWork';

// recoil 사용
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/user.js";
import CodeConnectModal from "../../components/Modal/CodeConnectModal";

// 코드등록
import { connectUserCode, getConnectedUserId } from "../../api/auth";

import { useNotification } from "../../hooks/useNotification.js";

export default function ChildMain() {
  const user = useRecoilValue(userState);
  const [condition, setCondition] = useState(null);
  const [fireFlag, setFireFlag] = useState(null);

  useNotification();

  // Overlay Message
  const message = [
    "1. 위시리스트에서 갖고 싶은 선물을 골라보세요",
    "2. 부모님이 선물 선택 후 포도 서비스가 시작됩니다",
    "3. 포도알을 31개 모아 선물을 얻으세요"
  ];

  useEffect(() => {
    const fetchUserCondition = async () => {
      const result = await getConnectedUserId();
      setCondition(result.data.is_connected);
    };
    fetchUserCondition();
    // console.log(condition);
  }, []);

  // condition이 null이면 아무것도 렌더링하지 않음
  if (condition === null) {
    return null;
  }

  return (
    <>
      {condition === false && <CodeConnectModal closeModal={setCondition} />}
      {fireFlag === true && <FireWork/>}
      {/* {<FireWork/>} */}
      <div className="relative bg-white">
        {/* 배너 */}
        <div className="px-4 py-2">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                {user.name}의 포도
              </h2>
              <p className="mt-2 text-lg text-gray-700">
                부모님이 주시는 미션을 수행해서 포도를 완성해요~ 😀
              </p>
            </div>
          </div>
        </div>

        {/* 포도판 */}
        <div className="m-auto md:w-6/12 max-[720px]:w-full">
          <Grapes message={message} setFire = {setFireFlag}/>
        </div>
      </div>
    </>
  );
}
