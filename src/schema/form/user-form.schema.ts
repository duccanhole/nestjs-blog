import { IsString, MinLength } from "class-validator";

export class UserFormSchema {
    @IsString()
    @MinLength(6)
    userName;
    @IsString()
    @MinLength(6)
    password;
  }