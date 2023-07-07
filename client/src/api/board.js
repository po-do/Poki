import client from "./client.js";
import * as process from 'process';
import { EventSourcePolyfill } from "event-source-polyfill";
import { getAccessToken } from "./auth.js";

// 포도 생성 (create) => 포도판 생성
export async function createBoard() {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  // console.log("createBoard 호출");
  const response = await client.post("/board/grape/create");
  return response.data;
}

// 포도 삭제
export async function deleteBoard() {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  // console.log("deleteBoard 호출");
  const response = await client.delete(`/board/grape`);
  return response.data;
}

// ???
export async function getBoardById() {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  // console.log("getBoardById 호출");
  const response = await client.get(`/board/grape/`);
  return response.data;
}

// 포도판의 현재상태를 조회한다. => 새로만듬..
export async function getBoardStatus() {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  // console.log("getBoardStatus 호출");
  const response = await client.post(`/board/grape/user`);
  return response.data;
}

export async function connectCall() {
  const sse = new EventSourcePolyfill(`${process.env.REACT_APP_API_URL}/board/connect`)

  sse.addEventListener('connect', e => {
    const {data: receivedData} = e;
    // console.log(receivedData)
  })
}

// ????
export async function getBoardByUserId() {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  // console.log("getBoardByUserId 호출");
  const response = await client.get(`/board/user/`);
  return response.data;
}

// 포도알 상태를 전부 업데이트 하는 함수
export async function updateBoard(params) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  const response = await client.post(`/board/grape`, params);
  return response.data;
}


// 포도알을 하나 붙이는 함수
export async function attachBoard() {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  // console.log("attachBoard 호출");
  const response = await client.post(`/board/grape/attach/`);
  return response.data;
}
