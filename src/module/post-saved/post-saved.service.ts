import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostSaved, PostSavedDocument } from './post-saved.schema';

@Injectable()
export class PostSavedService {
  constructor(
    @InjectModel(PostSaved.name, 'db')
    private postSavedModel: Model<PostSavedDocument>,
  ) {}
}
