import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { format } from 'path';
import { PasswordFormSchema, UserFormSchema } from 'src/schema';

@Controller('user')
export class UserController {
  // get all infor of user
  @Get(':id')
  getUserInfo() {
    return {
      username: 'test',
      posts: [],
      postsSaved: [],
    };
  }
  // get all post user saved
  @Get('posts-saved/:id')
  getPostSaved(@Param() id) {
    return id;
  }
  // get all post user posted
  @Get('posts-posted/:id')
  getPosted(@Param() id) {
    return id;
  }
  // create new user
  @Post('create')
  createUser(@Body() p: UserFormSchema) {
    return {
      statusCode: 200,
      data: p,
    };
  }
  // login
  @Post('login')
  login(@Body() p: UserFormSchema) {
    return {
      statusCode: 200,
      data: p,
    };
  }
  // change password
  @Post(':id/change-password')
  changePassword(@Body() form: PasswordFormSchema, @Param() id: string) {
    return {
      data: {
        id,
        form,
      },
    };
  }
  // create new post
  @Post(':id/create-posts')
  createPost(@Body() form, @Param() id) {}
  // delete post saved
  @Delete(':idUser/posts-saved/:idPosts')
  deletePostsSaved(@Param() param) {
    return {
      param,
    };
  }
  // delete post posted
  @Delete(':idUser/posts-posted/:idPosts')
  deletePostsPosted(@Body() form, @Param() parmam) {}
  // update post posted
  @Put(':idUser/posts/:idPosts')
  updatePostsPosted(@Body() format, @Param() param) {}
}
