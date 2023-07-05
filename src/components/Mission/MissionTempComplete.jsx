import React, { useState, useEffect } from "react";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import {
  missionReadChild,
  missionUpdate,
  setMissionStatusComplete,
  setMissionStatusInComplete,
} from "../../api/mission.js";
import { updateBoard, getBoardStatus } from "../../api/board.js";
import SuccessModal from "../../components/Modal/SuccessModal";
import FailModal from "../../components/Modal/FailModal";
import { getAccessToken } from "../../api/auth.js";
import { EventSourcePolyfill } from "event-source-polyfill";

// 미션의 상태가 WAIT_APPROVAL 즉 완료대기상태인것을 보여주는 컴포넌트
export default function MissionTempComplete() {
  const queryClient = new QueryClient();
  const [grape, setGrape] = useState({});
  const [missions, setMissions] = useState([]);
  const [selectedMissions, setSelectedMissions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [failModal, setFailModal] = useState(false);
  const [overFailModal, setOverFailModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);

  const handleConnect = () => {
    const accessToken = getAccessToken();

    const sse = new EventSourcePolyfill(
      `${process.env.REACT_APP_API_URL}/board/grape/sse/user`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        heartbeatTimeout: 180000,
      }
    );

    sse.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setGrape(data.grape);
    };
  };

  useEffect(() => {
    handleConnect();
  }, []);

  const openCreateBoardModal = () => {
    setShowCreateBoardModal(true);
  };

  const closeCreateBoardModal = () => {
    setShowCreateBoardModal(false);
  };

  // 초과발행 경고
  const openOverFailModal = () => {
    setOverFailModal(true);
  };

  const closeOverFailModal = () => {
    setOverFailModal(false);
  };

  // 포도알 발행 모달
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openFailModal = () => {
    setFailModal(true);
  };

  const closeFailModal = () => {
    setFailModal(false);
  };

  // 반려 버튼 모달
  const openShowReturnModal = () => {
    setShowReturnModal(true);
  };

  const closeShowReturnModal = () => {
    setShowReturnModal(false);
  };

  useEffect(() => {
    const getMission = async () => {
      const missionsData = await missionReadChild();
      const incompleteMissions = missionsData.filter(
        (mission) => mission.status === "WAIT_APPROVAL"
      );
      setMissions(incompleteMissions);
    };

    const intervalId = setInterval(getMission, 1000); // 1초마다 fetchData 함수 호출

    return () => {
      clearInterval(intervalId); // 컴포넌트가 언마운트될 때 interval 정리
    };
  }, []);

  const { mutate: complete } = useMutation(setMissionStatusComplete, {
    onSuccess: () => {
      queryClient.invalidateQueries("missions");
    },
  });

  const mutation = useMutation(missionUpdate, {
    onSuccess: () => {
      queryClient.invalidateQueries("missions");
    },
  });

  const addGrape = async (count) => {
    // 포도상태 가져오기
    const x = await getBoardStatus();
    const total = x.data.grape.total_grapes;

    const newStatus = {
      blank: grape?.blank,
      attached_grapes: grape?.attached_grapes,
      total_grapes: grape?.total_grapes + count,
      deattached_grapes: grape?.deattached_grapes + count,
    };

    try {
      await updateBoard(newStatus);

      // 성공모달
      openModal();

      // COMPLETE로 바꾸는 로직
      if (total + selectedMissions.length <= 31) {
        if (selectedMissions.length > 0) {
          selectedMissions.forEach((missionId) => {
            const updatedMission = {
              ...missions.find((mission) => mission.id === missionId),
            };
            complete({
              mission_id: missionId,
            });
          });
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // 403 Forbidden 에러 처리 로직
        console.error("Forbidden error:", error.response.data);
        openCreateBoardModal();
      } else {
        // 다른 종류의 오류에 대한 예외 처리 로직
        console.error("Error:", error);
        // 예외 처리를 위한 추가 작업을 수행하세요.
      }
    }
  };

  const handleCheckboxChange = (e, missionId) => {
    if (e.target.checked) {
      setSelectedMissions([...selectedMissions, missionId]);
    } else {
      setSelectedMissions(selectedMissions.filter((id) => id !== missionId));
    }
  };
  // 반려
  const handleReject = () => {
    // console.log(selectedMissions);
    selectedMissions.forEach((missionId) => {
      const param = {
        mission_id: missionId,
      };
      setMissionStatusInComplete(param);
    });

    if (selectedMissions.length > 0) {
      openShowReturnModal();
    } else {
      openFailModal();
    }

    setSelectedMissions([]);
  };

  // 포도알 발행
  const handlePublish = async () => {
    // 포도상태 가져오기
    const x = await getBoardStatus();
    const total = x.data.grape.total_grapes;

    // && 포도의 현재
    // check if total_grapes + selectedMissions.length would be more than 31
    if (total + selectedMissions.length <= 31) {
      if (selectedMissions.length > 0) {
        await addGrape(selectedMissions.length);
      } else {
        openFailModal();
      }
    } else {
      // if total_grapes + selectedMissions.length would be more than 31, open fail modal
      openOverFailModal();
    }

    setSelectedMissions([]);
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h3 className="text-2xl font-semibold mb-4">승인 대기 미션</h3>
          <div className="flex mt-4 sm:mt-0 sm:flex-none gap-2 justify-between">
            <p className="mt-2 ml-4 text-lg text-gray-700">
              미션을 수행 완료했습니다. 아이에게 칭찬 포도알을 주세요.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                className="whitespace-nowrap rounded-md  bg-white px-3 py-2 text-lg text-gray-900 ring-1 ring-gray-300 hover:bg-gray-100"
                onClick={handleReject}
              >
                거절
              </button>
              <button
                type="button"
                className="whitespace-nowrap block rounded-md bg-indigo-600 px-3 py-2 text-center text-lg text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                onClick={handlePublish}
              >
                포도알 주기
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 overflow-y-auto scrollbar-hide max-h-60">
        <div className="-mx-4 -my-2">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-base font-semibold text-gray-900 sm:pl-0"
                  >
                    완료된 미션
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {missions.map((item) => (
                  <tr key={item.id} className="flex">
                    <td className="py-4 pl-4 pr-4 gap-2">
                      <input
                        id="comments"
                        aria-describedby="comments-description"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        onChange={(e) => handleCheckboxChange(e, item.id)}
                      />
                    </td>
                    <td className="py-4 pl-4 pr-3 text-base text-gray-900 sm:pl-0 overflow-hidden text-overflow-ellipsis whitespace-nowrap">
                      {item.content}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showModal && (
        <SuccessModal closeModal={closeModal} message="포도알 발행 완료" />
      )}
      {failModal && (
        <FailModal
          closeModal={closeFailModal}
          message="체크박스를 선택 해주세요."
        />
      )}
      {overFailModal && (
        <FailModal
          closeModal={closeOverFailModal}
          message="발행한 포도알이 31개를 넘어서면 안됩니다."
        />
      )}
      {showReturnModal && (
        <SuccessModal closeModal={closeShowReturnModal} message="거절 완료" />
      )}
      {showCreateBoardModal && (
        <FailModal
          closeModal={closeCreateBoardModal}
          message="위시리스트에서 선물을 선택해주세요."
        />
      )}
    </div>
  );
}
