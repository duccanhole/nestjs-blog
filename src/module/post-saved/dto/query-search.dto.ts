import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class QuerySearch {
  @IsNumberString()
  @IsOptional()
  skip;
  @IsNumberString()
  @IsOptional()
  limit;
  @IsString()
  @IsOptional()
  filterBy;
}
