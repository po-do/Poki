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
import * as redisStore from 'cache-manager-redis-store'
import { CacheModule } from '@nestjs/cache-manager';

 
const jwtConfig = config.get('jwt');
const redisConfig = config.get('redis');

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
    CacheModule.register({
      store: redisStore,
      host: redisConfig.host,
      port: redisConfig.port
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtStrategy, PushService, PushConnectionRepository],
  exports: [JwtStrategy, PassportModule, TypeOrmModule, AuthService]
})
export class AuthModule {}