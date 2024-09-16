import { IUserBasicInfo } from "./user";

export interface IPost{
    userId: number,
    id: number,
    title: string,
    body: string
}


export interface IDisplayedPost extends IPost,IUserBasicInfo{}