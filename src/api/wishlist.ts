import client from "./client.ts";

// 유저 아이디별 위시리스트 조회(전부)
export async function getWishlistByUserId(params: GetWishlistByUserIdParams) {
  const response = await client.get(`/wishlist/user/${params.userid}`);
  return response.data;
}

// 아이템 아이디별 위시리스트 조회(1개만)
export async function getWishlistById(params: GetWishlistByIdParams) {
  const response = await client.get(`/wishlist/item/${params.itemid}`);
  return response.data;
}

// 위시리스트 생성
export async function createWishList(params: CreateWishListParams) {
  const response = await client.post("/wishlist/item/create", params.request);
  return response.data;
}

// 위시리스트 삭제
export async function deleteWishList(params: DeleteWishListParams) {
  const response = await client.delete(`/wishlist/item/${params.itemid}`);
  return response.data;
}

// 위시리스트의 pick status 변경
export async function updateWishlistPickStatus(
  params: UpdateWishlistPickStatusParams
) {
  const response = await client.patch(
    `/wishlist/item/${params.itemid}/pickstatus`,
    params.request
  );
  return response.data;
}

// 위시리스트의 given status 변경 (자식)
export async function updateWishlistGivenStatus(
  params: UpdateWishlistGivenStatusParams
) {
  const response = await client.patch(
    `/wishlist/item/${params.itemid}/givenstatus`,
    params.request
  );
  return response.data;
}

// 위시리스트 수정
export async function updateWishList(params: UpdateWishListParams) {
  const response = await client.patch(
    `/wishlist/item/${params.itemid}`,
    params.request
  );
  return response.data;
}

interface CreateWishListParams {
  request: {
    ProductName: string;
    ProductLink: string;
  };
}

interface GetWishlistByUserIdParams {
  userid: number;
}

interface GetWishlistByIdParams {
  itemid: number; // item id
}

interface UpdateWishListParams {
  itemid: number; // item id
}

interface DeleteWishListParams {
  itemid: number;
}

interface UpdateWishlistPickStatusParams {
  itemid: number;
  request: {
    Picked: boolean;
  };
}

interface UpdateWishlistGivenStatusParams {
  itemid: number;
  request: {
    Given: boolean;
  };
}

interface UpdateWishListParams {
  itemid: number;
  request: {
    ProductName: string;
    ProductLink: string;
  };
}
