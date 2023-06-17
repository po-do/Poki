import client from "./client.ts";

export function getAccessToken() {
  return localStorage.getItem("access_token");
}

export async function signIn(params: SignInParams) {
  const response = await client.post("/auth/signin", params.request);
  client.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${response.data.accessToken}`;
  // 토큰을 로컬 스토리지에 저장
  localStorage.setItem("access_token", response.data.accessToken);
  return response;
}

export async function signUp(params: SignUpParams) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  const response = await client.post("/auth/signup", params.request);
  return response.data;
}

export async function createUserCode(params: CreateUserCodeParams) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  const response = await client.get("/auth/user/code");
  return response.data;
}

export async function connectUserCode(params: ConnectUserCodeParams) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  // const response = await client.patch("/auth/user/connect", params.request);
  const response = await client.patch("/auth/user/connect", params.request);
  return response.data;
}

// ?? 현재 controller에서 제공하지 않음
export async function getUserType(params: GetUserTypeParams) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  const response = await client.get(`/auth/user/type/${params.userid}`);
  return response.data;
}

interface SignInParams {
  request: {
    user_id: string;
    password: string;
  };
}

export interface SignUpParams {
  request: {
    user_id: string;
    password: string;
    user_name: string;
    type: string; //"CHILD" or "PARENT"
  };
}

interface CreateUserCodeParams {}

interface ConnectUserCodeParams {
  request: {
    id: string; // userid 입니다
    connection_code: number;
  };
}

interface GetUserTypeParams {
  userid: string;
}
