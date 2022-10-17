import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostForm } from './dto/post-form.dto';
import { JwtAuthGuard } from '../auth-module/guards/jwt.guard';
import { Response } from 'express';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}
  @Get('all')
  getAll() {
    return this.postService.search();
  }
  @Post('create')
  @UseGuards(JwtAuthGuard)
  create(@Body() postData: PostForm, @Res() res: Response) {
    res.send({
      postData
    })
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
