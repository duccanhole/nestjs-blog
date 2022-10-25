import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class QuerySearch {
  @IsNumberString()
  @IsOptional()
  skip: number;
  @IsNumberString()
  @IsOptional()
  limmit: number;
  @IsOptional()
  @IsString()
  sortBy: string;
}
