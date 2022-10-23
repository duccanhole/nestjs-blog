import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { User } from '../user-module/user.schema';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({ required: true })
  title: string;
  @Prop()
  subTitle: string;
  @Prop({ required: true })
  url: string;
  @Prop({ required: true })
  view: number;
  @Prop({ required: true })
  tags: string;
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: User.name })
  createdBy: User;
  @Prop({ required: true })
  createdAt: Date;
}
export const PostSchema = SchemaFactory.createForClass(Post);
