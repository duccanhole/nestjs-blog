import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDocument } from 'src/module/post-module/post.schema';
import { PostForm, Post, PostEdit } from './dto/index';
import { QuerySearch } from './dto/query-search.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name, 'db') private postModel: Model<PostDocument>,
  ) {}

  async create(postData: PostForm) {
    const newPost: Post = {
      title: postData.title,
      subTitle: postData?.subtitle || '',
      url: postData.url,
      view: 0,
      tags: postData.tags,
      createdBy: postData.userId,
      createdAt: new Date().toISOString(),
    };
    await this.postModel.create(newPost);
  }
  async update(postData: PostEdit, postId: string) {
    try {
      await this.postModel.findByIdAndUpdate(postId, postData).exec();
    } catch (error) {
      throw error;
    }
  }
  async remove(postId: string) {
    try {
      await this.postModel.findByIdAndDelete(postId).exec();
    } catch (error) {
      throw error;
    }
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
  async getPosted(userId: String, skip = 0, limit = 10) {
    try {
      return await this.postModel
        .find({ createdBy: userId })
        .skip(skip)
        .limit(limit)
        .exec();
    } catch (error) {
      throw error;
    }
  }
  async search(query: QuerySearch) {
    const sortQuery = {};
    if (query.sortBy) {
      sortQuery[query.sortBy] = -1;
    }
    return await this.postModel
      .find()
      .skip(query?.skip || 0)
      .limit(query?.limmit || 10)
      .sort(sortQuery)
      .exec();
  }
}
