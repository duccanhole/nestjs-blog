import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInfo, PasswordForm } from './dto/index';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth-module/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name, 'db') private userModel: Model<UserDocument>,
    private authService: AuthService,
  ) {}
  // create new user
  async register(userInfo: UserInfo) {
    const user = await this.userModel
      .find({ userName: userInfo.userName })
      .exec();
    if (user.length > 0)
      throw new HttpException(
        'User adreadly exists',
        HttpStatus.NOT_ACCEPTABLE,
      );
    else {
      // hash the password
      const hashPassword = await bcrypt.hash(userInfo.password, 10);
      // after hash password, create new data and save to database
      const data: UserInfo = {
        userName: userInfo.userName,
        password: hashPassword,
      };
      await this.userModel.create(data);
    }
  }
  // check user infor, if valid, return token
  async login(userInfo: UserInfo) {
    const user = await this.userModel.findOne({ userName: userInfo.userName });
    if (user) {
      const checkPassword = await bcrypt.compare(
        userInfo.password,
        user.password,
      );
      if (checkPassword) {
        return {
          token: await this.authService.generateToken(userInfo),
          userId: user._id,
          userName: user.userName
        };
      } else {
        throw new HttpException(
          'Username or password is incorrect',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
  // change password
  async changePassword(passwordForm: PasswordForm, userId: string) {
    const user = await this.userModel.findById(userId);
    const checkPassword: boolean = await bcrypt.compare(
      passwordForm.oldPassword,
      user.password,
    );
    if (checkPassword) {
      const hashPassword = await bcrypt.hash(passwordForm.newPassword, 10);
      user.updateOne({ password: hashPassword }).exec();
    } else {
      throw new HttpException(
        'Password is incorrect',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }
  getAll() {
    return this.userModel.find().exec();
  }
}
