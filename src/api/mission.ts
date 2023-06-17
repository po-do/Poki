import client from "./client.ts";
import { getAccessToken } from "./auth.ts";

// 미션 조회 (Read)
export async function missionRead(params: MissionReadParams) {
  const response = await client.get(`/mission/detail/${params.mission_id}`);
  console.log("missionRead 호출");
  return response.data;
}

interface MissionReadParams {
  mission_id: number;
}

// 미션 생성 (Create)
export async function missionCreate(params: MissionCreateParams) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  console.log("missionCreate 호출");
  const response = await client.post("/mission/create", params.request);
  return response.data;
}

interface MissionCreateParams {
  request: {
    content: string;
    created_date: string;
    completed_date: string;
  };
}

// 미션 완료대기로 변경 (Complete)
export async function setMissionStatusWait(params: SetMissionStatusWaitParams) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  console.log("setMissionStatusWait 호출");
  const response = await client.post(`/mission/complete/${params.mission_id}`);
  return response.data;
}

interface SetMissionStatusWaitParams {
  mission_id: number;
}

// 미션 상태 complete로 바꾸기
export async function setMissionStatusComplete(
  params: setMissionStatusCompleteParams
) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  console.log("setMissionStatusComplete 호출");
  const response = await client.post(`/mission/approve/${params.mission_id}`);
  return response.data;
}

interface setMissionStatusCompleteParams {
  mission_id: number;
}

// 미션 수정 (Update)
export async function missionUpdate(params: MissionUpdateParams) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  console.log("missionUpdate 호출");
  const response = await client.patch(
    `/mission/update/${params.mission_id}`,
    params.request
  );
  return response.data;
}

interface MissionUpdateParams {
  mission_id: number;
  request: {
    content: string;
    created_date: string;
  };
}

// 미션 삭제 (Delete)
export async function missionDelete(params: MissionDeleteParams) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  console.log("missionDelete 호출");
  const response = await client.delete(`/mission/delete/${params.mission_id}`);
  return response.data;
}

interface MissionDeleteParams {
  mission_id: number;
}

// (자녀가) 부모가 생성한 미션 조회 (Read)
export async function missionReadChild() {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  console.log("missionReadChild 호출");
  const response = await client.get(`/mission/user/`);
  return response.data;
}

// interface MissionReadChildParams {
//   user_id: string;
// }

// (부모가) 자녀가 완료한 미션 확인  (Confirm)
export async function missionConfirm() {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  console.log("missionConfirm 호출");
  const response = await client.get(`/mission/user/approve`);
  return response.data;
}