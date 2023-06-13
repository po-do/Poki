import client from "./client.ts";

export function getAccessToken() {
  return localStorage.getItem("access_token");
}

export async function signIn(params: SignInParams) {
  const response = await client.post("/auth/signin", params.request);
  client.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${response.data.accessToken}`;
  return response;
}

export async function signUp(params: SignUpParams) {
  const response = await client.post("/auth/signup", params.request);
  return response.data;
}

export async function createUserCode(params: CreateUserCodeParams) {
  const response = await client.get("/auth/user/code");
  return response.data;
}

export async function connectUserCode(params: ConnectUserCodeParams) {
  const response = await client.patch("/auth/user/connect", params.request);
  return response.data;
}

export async function getUserType(params: GetUserTypeParams) {
  const response = await client.get(`/auth/user/type/${params.userid}`);
  return response.data;
}

interface SignInParams {
  request: {
    userid: string;
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
