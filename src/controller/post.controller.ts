import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import PostDto from "src/interfaces/post.interface";
import { PostService } from "src/service/post.service";


@Controller('post')
export class PostController{
    constructor(private postService: PostService){}

    @Post('create')
    async create(@Body() newPost: PostDto){
        this.postService.create(newPost);
    }
    @Get(':id')
    getDetailPosts(@Param() id){
        return id;
    }
    @Put(':id')
    updatePosts(){}
    @Delete(':id')
    deletePosts(){}
}