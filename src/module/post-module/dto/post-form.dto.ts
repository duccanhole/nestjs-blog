import { IsMongoId, IsString, IsUrl, MinLength } from 'class-validator';

export class PostForm {
  @IsString()
  @MinLength(6)
  title;
  subtile;
  @IsUrl()
  url;
  @IsMongoId()
  userId;
}
