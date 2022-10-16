import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInfo } from './dto/user-info';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth-module/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name, 'users') private userModel: Model<UserDocument>,
    private authService: AuthService
  ) {}

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

  async login(userInfo: UserInfo){
    const user = await this.userModel.findOne({ userName: userInfo.userName });
    if(user) {
      const checkPassword = await bcrypt.compareSync(userInfo.password, user.password);
      if(checkPassword) {
        return await this.authService.generateToken(userInfo);
      }
      else {
        throw new HttpException('Username or password is incorrect', HttpStatus.UNAUTHORIZED);
      }
    }
    else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
  getAll() {
    return this.userModel.find().exec();
  }
}
