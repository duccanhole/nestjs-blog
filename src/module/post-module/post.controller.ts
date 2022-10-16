import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsDto } from './posts.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}
  @Get('all')
  getAll(){
    return this.postService.search()
  }
  @Post('create')
  create(@Body() newPost: PostsDto) {
  }
  @Get(':id')
  getDetailPosts(@Param() id) {
    return id;
  }
  @Put(':id')
  updatePosts() {}
  @Delete(':id')
  deletePosts() {}
}
