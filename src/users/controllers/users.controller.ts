import { Controller, Post } from '@nestjs/common';

@Controller()
export class UsersController {
  @Post('/login')
  login() {
    return true;
  }

  @Post('/sign-up')
  signUp() {
    return true;
  }
}
