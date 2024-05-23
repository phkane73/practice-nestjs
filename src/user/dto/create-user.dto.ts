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
  projects: string[] | string;

  @IsEnum(activeYn)
  @IsNotEmpty()
  activeYn: activeYn;
}
