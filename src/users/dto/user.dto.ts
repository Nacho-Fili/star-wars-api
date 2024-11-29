import { UserRoles } from '../../enums/userRoles.enum';
import { UserDocument } from '../schemas/user.schema';

export class UserDTO {
  username: string;
  role: UserRoles;

  static fromDocument(document: UserDocument): UserDTO {
    return {
      username: document.username,
      role: document.role,
    };
  }
}
