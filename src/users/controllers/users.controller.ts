import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDTO } from '../dto/signUp.dto';
import { UsersProvider } from '../services/users.provider';
import { IsPublic } from '../../auth/decorators/isPublic.decorator';

@Controller()
export class UsersController {
  constructor(private readonly usersProvider: UsersProvider) {}

  @IsPublic()
  @Post('/sign-up')
  signUp(@Body() signUpDTO: SignUpDTO) {
    return this.usersProvider.signUp(signUpDTO);
  }
}
