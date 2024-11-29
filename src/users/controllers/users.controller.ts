import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDTO } from '../dto/signUp.dto';
import { UsersProvider } from '../services/users.provider';

@Controller()
export class UsersController {
  constructor(private readonly usersProvider: UsersProvider) {}

  @Post('/sign-up')
  signUp(@Body() signUpDTO: SignUpDTO) {
    return this.usersProvider.signUp(signUpDTO);
  }
}
