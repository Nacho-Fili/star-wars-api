import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/localAuth.guard';
import { AuthProvider } from '../services/auth.provider';
import { IsPublic } from '../decorators/isPublic.decorator';

@Controller()
export class AuthController {
  constructor(private authProvider: AuthProvider) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  login(@Request() req) {
    return this.authProvider.login(req.user);
  }
}
