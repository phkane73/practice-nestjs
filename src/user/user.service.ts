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
      if (username !== updateUserDto.username) {
        const nameExist = this.users.findIndex(
          (user) => user.username === updateUserDto.username,
        );
        if (nameExist !== -1) {
          throw new HttpException('Name is exist', HttpStatus.CONFLICT);
        }
      }
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

  removeDiacritics(str: string) {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s/g, '');
  }

  search(searchUserDto: SearchUserDto): CreateUserDto[] {
    return this.users.filter((user) => {
      if (searchUserDto.searchKeyWord !== '') {
        const keyword: string = this.removeDiacritics(
          searchUserDto.searchKeyWord,
        ).toLowerCase();
        if (
          !(
            this.removeDiacritics(user.username)
              .toLowerCase()
              .includes(keyword) ||
            this.removeDiacritics(user.fullname)
              .toLowerCase()
              .includes(keyword) ||
            user.projects.some((project) =>
              this.removeDiacritics(project).toLowerCase().includes(keyword),
            )
          )
        ) {
          return false;
        }
      }
      if (searchUserDto.role !== '') {
        const role: string = this.removeDiacritics(
          searchUserDto.role,
        ).toLowerCase();
        if (!this.removeDiacritics(user.role).toLowerCase().includes(role)) {
          return false;
        }
      }
      if (searchUserDto.activeYn) {
        if (searchUserDto.activeYn !== user.activeYn) {
          return false;
        }
      }
      return true;
    });
  }
}
