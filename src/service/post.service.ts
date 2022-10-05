import { Injectable } from "@nestjs/common";
import { PostDto } from "src/interfaces/post.interface";

@Injectable()
export class PostService{
    create(post: PostDto){}
}