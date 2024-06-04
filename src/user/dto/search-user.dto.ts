import { activeYn } from '../enums/user.enum';

export interface SearchUserDto {
  searchKeyWord?: string;
  role?: string;
  activeYn?: activeYn;
}
