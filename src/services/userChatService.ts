import { postUserQuery } from "../lib/userChatServiceApiClient";


export async function sendUserQuery(userQuery:string){
    const response = await postUserQuery(userQuery);
    return response;
}