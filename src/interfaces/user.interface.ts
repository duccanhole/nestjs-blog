import { PostDto } from "./post.interface";

export interface UserDto{
    userName: String,
    posted: PostDto[],
    postSaved: PostDto[],
    _id: String
}