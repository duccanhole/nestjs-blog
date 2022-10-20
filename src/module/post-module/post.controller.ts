import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParamData,
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
  @Get(':postId')
  async getPostDetail(@Param('postId') postId: string, @Res() res: Response) {
    try {
      return res.send({
        results: await this.postService.getDetail(postId),
      });
    } catch (error) {
      res.send(error);
    }
  }
  @Post('create')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async create(@Body() postData: PostForm, @Res() res: Response) {
    try {
      await this.postService.create(postData);
      res.send({
        message: 'Success',
      });
    } catch (error) {
      res.send(error);
    }
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
