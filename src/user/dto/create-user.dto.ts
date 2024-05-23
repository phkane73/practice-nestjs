import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { activeYn } from '../enums/user.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({})
  username: string;

  @IsString()
  fullname: string;

  @IsString()
  role: string;

  @IsString({ each: true })
  projects: [];

  @IsEnum(activeYn)
  @IsNotEmpty()
  activeYn: activeYn;
}
