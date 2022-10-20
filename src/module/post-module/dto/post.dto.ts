import { IsMongoId, IsPositive, IsString, IsUrl, MinLength } from "class-validator";

export class Post {
    @IsString()
    @MinLength(5)
    title;
    subTitle;
    @IsUrl()
    url;
    @IsPositive()
    view;
    @IsMongoId()
    createdBy;
}