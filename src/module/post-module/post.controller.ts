import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostForm } from './dto/post-form.dto';
import { JwtAuthGuard } from '../auth-module/guards/jwt.guard';
import { Response } from 'express';
import { QuerySearch } from './dto/query-search.dto';
import { PostEdit } from './dto';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}
  @Get()
  async searchPost(@Query() query: QuerySearch, @Res() res: Response) {
    try {
      res.send({
        results: await this.postService.search(query),
      });
    } catch (error) {
      res.send(error);
    }
  }
  // get detail post data
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
  // update
  @Put(':postId')
  @UseGuards(JwtAuthGuard)
  async updatePost(
    @Body() postData: PostEdit,
    @Param('postId') postId: string,
    @Res() res: Response,
  ) {
    try {
      await this.postService.update(postData, postId);
      res.send({
        message: 'Success',
      });
    } catch (error) {
      res.send(error);
    }
  }
  // delete
  @Delete(':postId')
  async deletePost(@Param('postId') postId: string, @Res() res: Response) {
    try {
      await this.postService.remove(postId);
      res.send({
        message: 'Success',
      });
    } catch (error) {}
  }
  // create new post
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
  // get post of user
  @Get('posted/:userId')
  @UseGuards(JwtAuthGuard)
  async getUserPosted(@Param('userId') userId, @Res() res: Response) {
    try {
      res.send({
        results: await this.postService.getPosted(userId),
      });
    } catch (error) {
      res.send(error);
    }
  }
}
