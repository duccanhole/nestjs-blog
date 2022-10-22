import {
  IsArray,
  IsMongoId,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class PostForm {
  @IsString()
  @MinLength(6)
  title;
  subtile;
  @IsUrl()
  url;
  @IsString()
  tags: string;
  @IsMongoId()
  userId;
}
