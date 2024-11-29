import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDTO } from '../dto/signUp.dto';
import { UsersProvider } from '../services/users.provider';
import { IsPublic } from '../../auth/decorators/isPublic.decorator';
import { UserRoles } from '../../enums/userRoles.enum';

@Controller()
export class UsersController {
  constructor(private readonly usersProvider: UsersProvider) {}

  @IsPublic()
  @Post('/sign-up')
  signUp(@Body() signUpDTO: SignUpDTO) {
    return this.usersProvider.signUp(signUpDTO);
  }

  @Post('/users')
  createUser(@Body() signUpDTO: SignUpDTO & { role: UserRoles }) {
    const { role, ...dto } = signUpDTO;
    return this.usersProvider.createUser(dto, role);
  }
}
