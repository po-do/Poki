import client from "./client.js";
import { getAccessToken } from "./auth.js";

// 미션 조회 (Read)
// export async function missionRead(params) {
//   const response = await client.get(`/mission/detail/${params.mission_id}`);
//   console.log("missionRead 호출");
//   return response.data;
// }


// 현재일 기준 수행 가능한 미션 조회 (Read)
export async function newMissionRead() {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  const response = await client.get(`/mission/user/incomplete`);
  // console.log("newMissionRead 호출");
  return response.data;
}

// 미션 생성 (Create)
export async function missionCreate(params) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  // console.log("missionCreate 호출");
  const response = await client.post("/mission/create", params.request);
  return response.data;
}

// 미션 완료대기로 변경 (Complete)
export async function setMissionStatusWait(params) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  // console.log("setMissionStatusWait 호출");
  const response = await client.post(`/mission/complete/${params.mission_id}`);
  return response.data;
}

// 미션 상태 complete로 바꾸기
export async function setMissionStatusComplete(params) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  // console.log("setMissionStatusComplete 호출");
  const response = await client.post(`/mission/approve/${params.mission_id}`);
  return response.data;
}

// 미션 상태 Incomplete로 바꾸기
export async function setMissionStatusInComplete(params) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  // console.log("setMissionStatusComplete 호출");
  const response = await client.post(`/mission/reject/${params.mission_id}`);
  return response.data;
}

// 미션 수정 (Update)
export async function missionUpdate(params) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  // console.log("missionUpdate 호출");
  const response = await client.patch(
    `/mission/update/${params.mission_id}`,
    params.request
  );
  return response.data;
}

// 미션 삭제 (Delete)
export async function missionDelete(params) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  // console.log("missionDelete 호출");
  const response = await client.delete(`/mission/delete/${params.mission_id}`);
  return response.data;
}

// (자녀가) 부모가 생성한 미션 조회 (Read)
export async function missionReadChild() {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }

  const response = await client.get(`/mission/user`);
  return response.data;
}

// (부모가) 자녀가 완료한 미션 확인  (Confirm)
export async function missionConfirm() {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  // console.log("missionConfirm 호출");
  const response = await client.get(`/mission/user/approve`);
  return response.data;
}

// AI 추천 API
export async function missionRecommend(params) {
  const accessToken = getAccessToken();
  // console.log(params);
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  // console.log("missionRecommend 호출");
  const response = await client.post("/mission/recommend", params.request);
  return response.data;
}
