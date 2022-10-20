import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDocument } from 'src/module/post-module/post.schema';
import { PostForm, Post } from './dto/index';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name, 'posts') private postModel: Model<PostDocument>,
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
    return await (await this.postModel.findById(id)).populate('createdBy');
  }
  search() {
    return this.postModel.find().exec();
  }
}
