import { IsString, MinLength } from "class-validator";

export class PasswordForm {
    @IsString()
    @MinLength(6)
    oldPassword;
    @IsString()
    @MinLength(6)
    newPassword;
}