import { IsOptional, IsString, IsUrl, MinLength } from "class-validator";

export class PostEdit {
    @IsString()
    @MinLength(3)
    @IsOptional()
    title: string;
    @IsString()
    @MinLength(3)
    @IsOptional()
    subTitle: string;
    @IsUrl()
    @IsOptional()
    url;
    tags: string;
}