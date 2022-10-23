import { IsDate, IsMongoId, IsPositive, IsString, IsUrl, MinLength } from "class-validator";

export class Post {
    @IsString()
    @MinLength(3)
    title;
    subTitle;
    @IsUrl()
    url;
    @IsPositive()
    view;
    @IsString()
    tags;
    @IsMongoId()
    createdBy;
    @IsDate()
    createdAt;
}