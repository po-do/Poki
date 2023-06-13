import client from './client.ts';
import { getAccessToken } from "./auth.ts";

export async function createBoard(params: CreateBoardParams) {
    const response = await client.post(
        '/board/grape/create', params.request
    )
    return response.data;
}

export async function deleteBoard(params: DeleteBoardParams) {
    const response = await client.delete(
        `/board/grape/${params.grapeId}`
    )
    return response.data;
}

export async function getBoardById(params: GetBoardByIdParams) {
    const response = await client.get(
        `/board/grape/${params.grapeId}`
    )
    return response.data;
}

export async function getBoardByUserId(params: GetBoardByUserIdParams) {
    const response = await client.get(
        `/board/user/${params.userId}`
    )
    return response.data;
}

export async function updateBoard(params: UpdateBoardParams) {
    const response = await client.patch(
        `/board/grape/${params.grapeId}`, params.request
    )
    return response.data;
}

export async function attachBoard(params: AttachBoardParams) {
    const response = await client.patch(
        `/board/grape/attach/${params.grapeId}`
    )
    return response.data;
}

interface CreateBoardParams {
    request: {
        "blank": number,
        "total_grapes": number,
        "attached_grapes": number,
        "deattached_grapes": number
    }
}

interface DeleteBoardParams{
    grapeId: number
}

interface GetBoardByIdParams{
    grapeId: number
}

interface GetBoardByUserIdParams{
    userId: string
}

interface UpdateBoardParams{
    grapeId: number,
    request:{
        "blank": number,
        "total_grapes": number,
        "attached_grapes": number,
        "deattached_grapes": number
    }
}

interface AttachBoardParams {
    grapeId: number
}