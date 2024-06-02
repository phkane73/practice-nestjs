import { IsEnum, IsOptional, IsString } from 'class-validator';
import { activeYn } from '../enums/user.enum';

export class SearchUserDto {
  @IsString()
  @IsOptional()
  searchKeyWord: string;

  @IsEnum(activeYn)
  @IsOptional()
  activeYn: activeYn;
}
