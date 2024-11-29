import { SignUpDTO } from '../dto/signUp.dto';
import { UserRoles } from '../../enums/userRoles.enum';

export class UsersProviderMock {
  signUp(signUpDTO: SignUpDTO) {
    return {
      username: signUpDTO.username,
      role: UserRoles.REGULAR,
    };
  }

  create(signUpDTO: SignUpDTO, role: UserRoles) {
    return {
      username: signUpDTO.username,
      role,
    };
  }
}
