import { Injectable } from "@nestjs/common";
import PostsDto from "src/interfaces/post.interface";

@Injectable()
export class PostService{
    create(post: PostsDto){}
}