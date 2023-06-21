import client from "./client.js";

// 로컬스토리지 토큰 접근 함수
export function getAccessToken() {
  return localStorage.getItem("access_token");
}

// 로그인
export async function signIn(params) {
  const response = await client.post("/auth/signin", params.request);
  client.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${response.data.accessToken}`;
  // 토큰을 로컬 스토리지에 저장
  localStorage.setItem("access_token", response.data.accessToken);
  return response;
}

// 회원가입
export async function signUp(params) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  const response = await client.post("/auth/signup", params.request);
  return response.data;
}

// 부모의 id를 가지고 자식의 연결 code를 생성 -> 생성 후 code를 해당 부모 id에 저장
export async function createUserCode(params) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  const response = await client.get("/auth/user/code");
  console.log("createUserCode");
  return response.data;
}

// 자녀가 code로 부모와 연결
export async function connectUserCode(params) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  const response = await client.patch("/auth/user/connect", params.request);
  return response.data;
}

// 유저의 타입을 받는 함수 ?? 현재 controller에서 제공하지 않음 => 없어도 될듯? recoil에서 가지고 있음
export async function getUserType(params) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  const response = await client.get(`/auth/user/type/${params.userid}`);
  return response.data;
}

// 유저의 연결 여부 확인 (코드 등록)
export async function getConnectedUser(params) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  const response = await client.get(`/auth/connected-user`);
  return response.data;
}

// 유저와 연결된 user의 id 반환
export async function getConnectedUserId(params) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  const response = await client.get(`/auth/connected-user/id`);
  return response.data;
}
