import { SignUpDTO } from '../dto/signUp.dto';

export class UsersProviderMock {
  signUp(signUpDTO: SignUpDTO) {
    return {
      username: signUpDTO.username,
      role: signUpDTO.role,
    };
  }
}
