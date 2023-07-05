import client from "./client.js";
import { getAccessToken } from "./auth.js";

// 미션 상태 complete로 바꾸기
export async function ChatRead(params) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  const response = await client.get(`/chat/${params.room_name}`);
  // console.log("ChatRead");
  return response.data;
}
