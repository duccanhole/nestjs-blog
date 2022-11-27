import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostSaved, PostSavedDocument } from './post-saved.schema';

@Injectable()
export class PostSavedService {
  constructor(
    @InjectModel(PostSaved.name, 'db')
    private postSavedModel: Model<PostSavedDocument>,
  ) {}
  async save(userId: String, postId: String) {
    const records = await this.postSavedModel.find({ userId, postId }).exec();
    if (records.length === 0) {
      await this.postSavedModel.create({
        userId,
        postId,
      });
    } else {
      throw new HttpException(
        'You already saved this post',
        HttpStatus.CONFLICT,
      );
    }
  }
  async unsave(userId: String, postId: String) {
    await this.postSavedModel.findByIdAndDelete({ userId, postId }).exec();
  }
  async getPostSaved(
    userId: String,
    skip: number = 0,
    limit: number = 10,
    filterBy = null,
  ) {
    const filterQuery = {
      userId,
    };
    if (filterBy) {
      filterQuery['tags'] = filterBy;
    }
    return await this.postSavedModel
      .find(filterQuery)
      .populate('postId')
      .skip(skip)
      .limit(limit)
      .exec();
  }
}
