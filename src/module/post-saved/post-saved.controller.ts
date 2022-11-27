import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth-module/guards/jwt.guard';
import { PostSaved, QuerySearch } from './dto';
import { PostSavedService } from './post-saved.service';

@Controller('post-saved')
export class PostSavedController {
  constructor(private postSavedService: PostSavedService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  async savePost(@Body() data: PostSaved, @Res() res: Response) {
    try {
      await this.postSavedService.save(data.userId, data.postId);
      res.send({
        message: 'Success',
      });
    } catch (error) {
      res.send(error);
    }
  }
  @Delete(':userId/unsave/:postId')
  @UseGuards(JwtAuthGuard)
  async unsavePost(
    @Param('userId') userId: string,
    @Param('postId') postId: string,
    @Res() res: Response,
  ) {
    try {
      await this.postSavedService.unsave(userId, postId);
      res.send({
        message: 'Success',
      });
    } catch (error) {
      res.send(error);
    }
  }
  @Get(':userId')
  @UseGuards(JwtAuthGuard)
  async getPostSaved(
    @Param('userId') userId,
    @Query() query: QuerySearch,
    @Res() res: Response,
  ) {
    try {
      res.send({
        results: await this.postSavedService.getPostSaved(
          userId,
          query.skip,
          query.limit,
          query.filterBy
        ),
      });
    } catch (error) {
      res.send(error);
    }
  }
}
