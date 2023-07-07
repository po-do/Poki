import client from "./client.js";
import { getAccessToken } from "./auth.js";

// 유저 아이디별 위시리스트 조회(전부)
export async function getWishlistByUserId() {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  const response = await client.get(`/wishlist/user`);
  // console.log("getWishlistByUserId");
  return response.data;
}

// 아이템 아이디별 위시리스트 조회(1개만)
export async function getWishlistById(params) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  const response = await client.get(`/wishlist/item/${params.itemid}`);
  // console.log("getWishlistById");
  return response.data;
}

// 위시리스트 생성
export async function createWishList(params) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  const response = await client.post("/wishlist/item/create", params.request);
  // console.log("createWishList");
  return response.data;
}

// 위시리스트 삭제
export async function deleteWishList(params) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  const response = await client.delete(`/wishlist/item/${params.itemid}`);
  // console.log("deleteWishList");
  return response.data;
}

// 위시리스트의 pick status 변경
export async function updateWishlistPickStatus(params) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  const response = await client.patch(
    `/wishlist/item/${params.itemid}/pickstatus`
  );
  // console.log("updateWishlistPickStatus");
  return response.data;
}

// 위시리스트의 given status 변경 (자식)
export async function updateWishlistGivenStatus(params) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  const response = await client.post(
    `/wishlist/item/${params.itemid}/givenstatus`,
    params.request
  );
  // console.log("updateWishlistGivenStatus");
  return response.data;
}

// 위시리스트 수정
export async function updateWishList(params) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  const response = await client.patch(
    `/wishlist/item/${params.itemid}`,
    params.request
  );
  // console.log("updateWishList");
  return response.data;
}

// 네이버 API 요청
export async function getShoppingList(params) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  const response = await client.post(`/wishlist/shopping-list`, params.request);
  // console.log("getShoppingList");
  return response.data;
}
