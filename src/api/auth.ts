import client from './client';

export async function signIn(params: SignInParams) {
    const response = await client.post(
        '/auth/signin', params.request
    )
    return response.data;
}

export async function signUp(params: SignUpParams) {
    const response = await client.post(
        '/auth/signup', params.request
    )
    return response.data;
}

export async function createUserCode(params: CreateUserCodeParams) {
    const response = await client.get(
        '/auth/user/code'
    )
    return response.data;
}

export async function connectUserCode(params: ConnectUserCodeParams) {
    const response = await client.patch(
        '/auth/user/connect', params.request
    )
    return response.data;
}

export async function getUserType(params: GetUserTypeParams) {
    const response = await client.get(
        `/auth/user/type/${params.userid}`
    )
    return response.data;
}

interface SignInParams {
    request: {
        "userid": string,
        "password": string
    }
}

interface SignUpParams {
    request: {
        "userid": string,
        "password": string,
        "username": string,
		"type": string, //"CHILD" or "PARENT"
		"code": string,
    }
}

interface CreateUserCodeParams {}

interface ConnectUserCodeParams {
    request: {
        "id": string, // userid 입니다
		"connection_code": number
    }
}

interface GetUserTypeParams {
    userid: string
}