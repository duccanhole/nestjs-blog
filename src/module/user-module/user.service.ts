import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInfo } from './dto/user-info';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name, 'users') private userModel: Model<UserDocument>,
  ) {}

  async register(userInfo: UserInfo) {
    const user = await this.userModel
      .find({ userName: userInfo.userName })
      .exec();
    if (user.length > 0) throw new HttpException('User adreadly exists', HttpStatus.NOT_ACCEPTABLE);
    else {
      await this.userModel.create(userInfo);
    }
  }
  getAll() {
    return this.userModel.find().exec();
  }
}
