import client from "./client.ts";
import { getAccessToken } from "./auth.ts";

// 유저 아이디별 위시리스트 조회(전부)
export async function getWishlistByUserId() {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  const response = await client.get(`/wishlist/user`);
  return response.data;
}

// 아이템 아이디별 위시리스트 조회(1개만)
export async function getWishlistById(params: GetWishlistByIdParams) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  const response = await client.get(`/wishlist/item/${params.itemid}`);
  return response.data;
}

interface GetWishlistByIdParams {
  itemid: number; // item id
}

// 위시리스트 생성
export async function createWishList(params: CreateWishListParams) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  const response = await client.post("/wishlist/item/create", params.request);
  return response.data;
}

interface CreateWishListParams {
  request: {
    ProductName: string;
    ProductLink: string;
  };
}

// 위시리스트 삭제
export async function deleteWishList(params: DeleteWishListParams) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  const response = await client.delete(`/wishlist/item/${params.itemid}`);
  return response.data;
}

interface DeleteWishListParams {
  itemid: number;
}

// 위시리스트의 pick status 변경
export async function updateWishlistPickStatus(
  params: UpdateWishlistPickStatusParams
) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  const response = await client.patch(
    `/wishlist/item/${params.itemid}/pickstatus`,
    params.request
  );
  return response.data;
}

interface UpdateWishlistPickStatusParams {
  itemid: number;
  request: {
    Picked: boolean;
  };
}

// 위시리스트의 given status 변경 (자식)
export async function updateWishlistGivenStatus(
  params: UpdateWishlistGivenStatusParams
) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  const response = await client.patch(
    `/wishlist/item/${params.itemid}/givenstatus`,
    params.request
  );
  return response.data;
}

interface UpdateWishlistGivenStatusParams {
  itemid: number;
  request: {
    Given: boolean;
  };
}

// 위시리스트 수정
export async function updateWishList(params: UpdateWishListParams) {
  const accessToken = getAccessToken();
  if (accessToken) {
    client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  const response = await client.patch(
    `/wishlist/item/${params.itemid}`,
    params.request
  );
  return response.data;
}

interface UpdateWishListParams {
  itemid: number;
  request: {
    ProductName: string;
    ProductLink: string;
  };
}
