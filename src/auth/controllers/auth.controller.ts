import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/localAuth.guard';
import { AuthProvider } from '../services/auth.provider';
import { IsPublic } from '../decorators/isPublic.decorator';
import { LoginDTO } from '../dto/login.dto';

@Controller()
export class AuthController {
  constructor(private authProvider: AuthProvider) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(@Request() req, @Body() _: LoginDTO) {
    return this.authProvider.login(req.user);
  }
}
