import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IsString, MinLength } from 'class-validator';

class createUserDto {
  @IsString()
  @MinLength(6)
  userName;
  @IsString()
  @MinLength(6)
  password;
}

@Controller('user')
export class UserController {
  @Get('info')
  getUserInfo() {
    return {
      username: 'test',
      posts: [],
      postsSaved: [],
    };
  }
  @Post('create')
  @UsePipes(new ValidationPipe({ transform: true }))
  createUser(@Body() p: createUserDto) {
    return {
      statusCode: 200,
      data: p,
    };
  }
}
