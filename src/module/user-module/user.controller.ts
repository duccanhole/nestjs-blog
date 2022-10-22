import { Body, Controller, Get, HttpCode, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth-module/guards/jwt.guard';
import { PasswordForm } from './dto';
import { UserInfo } from './dto/user-info';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('register')
  @HttpCode(200)
  async register(@Body() userInfo: UserInfo, @Res() res: Response) {
    try {
      await this.userService.register(userInfo);
      res.send({
        message: 'Success'
      })
    } catch (error) {
      res.status(error.status).json({
        message: error.message,
      });
    }
  }
  @Post('login')
  async login(@Body() userInfo: UserInfo, @Res() res: Response) {
    try {
      res.send({
        results: await this.userService.login(userInfo)
      })
    } catch (error) {
      res.status(error?.status).json({
        message: error?.message
      })
    }
  }
  // update user password 
  @Put('change-password/:userId')
  @UseGuards(JwtAuthGuard)
  async changePassword(@Body() passwordForm: PasswordForm, @Param('userId') param: string, @Res() res: Response){
    try {
      await this.userService.changePassword(passwordForm, param)
      res.send({
        message: "Success"
      });
    } catch (error) {
      res.send(error);
    }
  }
  @Get('all')
  getAll() {
    return this.userService.getAll();
  }
}
