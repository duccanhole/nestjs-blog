import { IsMongoId } from 'class-validator';

export class PostSaved {
  @IsMongoId()
  userId;
  @IsMongoId()
  postId;
}
