import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as config from 'config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { PushService } from 'src/push/push.service';
import { PushConnectionRepository } from 'src/push/push-connection.repository';
import { PushModule } from 'src/push/push.module';
 
const jwtConfig = config.get('jwt');

@Module({
  imports : [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions:{
        expiresIn: process.env.JWT_EXPIREIN || jwtConfig.expiresIn
      }
    }),
    TypeOrmModule.forFeature([UserRepository, PushConnectionRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtStrategy, PushService, PushConnectionRepository],
  exports: [JwtStrategy, PassportModule, TypeOrmModule, AuthService]
})
export class AuthModule {}