import { IsNumberString, IsOptional } from 'class-validator';

export class QuerySearch {
  @IsNumberString()
  @IsOptional()
  skip;
  @IsNumberString()
  @IsOptional()
  limit;
}
