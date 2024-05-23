import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private users = new Array<CreateUserDto>();

  insert(createUserDto: CreateUserDto): CreateUserDto {
    const userExist = this.users.some(
      (user) => user.username === createUserDto.username,
    );
    if (userExist) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    } else {
      this.users.push(createUserDto);
      return createUserDto;
    }
  }

  update(username: string, updateUserDto: UpdateUserDto): UpdateUserDto {
    const userIndex = this.users.findIndex(
      (user) => user.username === username,
    );
    if (userIndex === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } else {
      const updatedUser = { ...this.users[userIndex], ...updateUserDto };
      this.users[userIndex] = updatedUser;
      return updatedUser;
    }
  }

  delete(username: string): CreateUserDto {
    const index = this.users.findIndex((user) => user.username === username);
    if (index === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } else {
      const [user] = this.users.splice(index, 1);
      return user;
    }
  }

  search(searchUserDto: SearchUserDto): SearchUserDto[] {
    return this.users.filter((user) => {
      for (const property in searchUserDto) {
        if (searchUserDto[property] !== user[property]) {
          return false;
        }
      }
      return true;
    });
  }
}
