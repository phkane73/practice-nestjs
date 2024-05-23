import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('insert')
  insert(@Body() createUserDto: CreateUserDto): CreateUserDto {
    return this.userService.insert(createUserDto);
  }

  @Patch('update/:username')
  update(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ): UpdateUserDto {
    return this.userService.update(username, updateUserDto);
  }

  @Delete('delete/:username')
  delete(@Param('username') username: string): CreateUserDto {
    return this.userService.delete(username);
  }

  @Get('search')
  search(@Query() searchContent: SearchUserDto): SearchUserDto[] {
    return this.userService.search(searchContent);
  }
}
