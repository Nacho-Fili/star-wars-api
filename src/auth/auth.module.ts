import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthProvider } from './services/auth.provider';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './services/jwt.strategy';
import { LocalStrategy } from './services/local.strategy';
import { AuthController } from './controllers/auth.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '600s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthProvider, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
