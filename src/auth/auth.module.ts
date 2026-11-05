import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UsersModule } from '../users/users.module.js';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule, 
    JwtModule.registerAsync({
    inject:[ConfigService],
    useFactory:(ConfigService : ConfigService) => ({
    secret: ConfigService.get<string>('JWT_SECRET'),
    signOptions:{
      expiresIn: '1h',
    }
    }),
  })
  ],
  providers: [AuthService,],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}