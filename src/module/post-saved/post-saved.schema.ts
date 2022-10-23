import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { Post } from '../post-module/post.schema';
import { User } from '../user-module/user.schema';

export type PostSavedDocument = Post & Document;

@Schema()
export class PostSaved {
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: Post.name })
  postId: Post;
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: User.name })
  userId: User;
}
export const PostSavedSchema = SchemaFactory.createForClass(PostSaved);
