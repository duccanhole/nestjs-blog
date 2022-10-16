import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from 'src/module/post-module/post.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name, 'posts') private postModel: Model<PostDocument>) {}

  search() {
    return this.postModel.find().exec();
  }
}
