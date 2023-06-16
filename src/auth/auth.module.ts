import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as config from 'config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
 
const jwtConfig = config.get('jwt');

@Module({
  imports : [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions:{
        expiresIn: jwtConfig.expiresIn
      }
    }),
    TypeOrmModule.forFeature([UserRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtStrategy],
  exports: [JwtStrategy, PassportModule, TypeOrmModule, AuthService]
})
export class AuthModule {}

