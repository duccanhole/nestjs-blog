import { IsString, MinLength } from 'class-validator';

export class UserInfo {
  @IsString()
  @MinLength(3)
  userName;
  @IsString()
  @MinLength(6)
  password;
}
