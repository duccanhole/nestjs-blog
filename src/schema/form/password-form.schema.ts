import { IsString, MinLength } from "class-validator";

export class PasswordFormSchema{
    @IsString()
    @MinLength(6)
    oldPassword;
    @IsString()
    @MinLength(6)
    newPassword;
}