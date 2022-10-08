import { IsArray, IsString } from "class-validator";
import { PostDto } from "./post.interface";

export class UserDto{
    @IsString()
    userName: String;
    @IsArray()
    posted: PostDto[];
    @IsArray()
    postSaved: PostDto[];
    @IsString()
    _id: String;
}