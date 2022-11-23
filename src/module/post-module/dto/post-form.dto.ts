import {
  IsMongoId,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class PostForm {
  @IsString()
  @MinLength(3)
  title;
  subtitle;
  @IsUrl()
  url;
  @IsString()
  tags: string;
  @IsMongoId()
  userId;
}
