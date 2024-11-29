import { Injectable } from '@nestjs/common';
import { UsersProvider } from '../../users/services/users.provider';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthProvider {
  constructor(
    private readonly usersService: UsersProvider,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.getUser(username);
    const { password: hashedPassword, ...publicUser } = user;
    const authorized = await compare(password, hashedPassword);
    if (!authorized) return null;

    return publicUser;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.userId,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
