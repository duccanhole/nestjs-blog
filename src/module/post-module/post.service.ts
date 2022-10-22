import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDocument } from 'src/module/post-module/post.schema';
import { PostForm, Post } from './dto/index';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name, 'db') private postModel: Model<PostDocument>,
  ) {}

  async create(postData: PostForm) {
    const newPost: Post = {
      title: postData.title,
      subTitle: postData?.subtile || '',
      url: postData.url,
      view: 0,
      createdBy: postData.userId,
    };
    await this.postModel.create(newPost);
  }
  async getDetail(id: String) {
    try {
      return await this.postModel
        .findById(id)
        .populate({ path: 'createdBy', select: '_id' })
        .populate({ path: 'createdBy', select: 'userName' })
        .exec();
    } catch (error) {
      throw error;
    }
  }
  async getPosted(userId: String) {
    try {
      return await this.postModel.find({ createdBy: userId }).exec();
    } catch (error) {
      throw error;
    }
  }
  search() {
    return this.postModel.find().exec();
  }
}
