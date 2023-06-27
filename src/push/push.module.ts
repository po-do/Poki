import { Module } from '@nestjs/common';
import { PushService } from './push.service';
import { PushController } from './push.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PushConnectionRepository } from './push-connection.repository';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserRepository } from 'src/auth/user.repository';
import { JwtService } from '@nestjs/jwt';
import * as redisStore from 'cache-manager-redis-store'
import { CacheModule } from '@nestjs/cache-manager';
import * as config from 'config';

const redisConfig = config.get('redis');
@Module({
    imports: [TypeOrmModule.forFeature([
      PushConnectionRepository,
    UserRepository]),
    AuthModule,
    CacheModule.register({
      store: redisStore,
      host: redisConfig.host,
      port: redisConfig.port
    }),
  ],
  providers: [PushService, AuthService, UserRepository, JwtService],
  controllers: [PushController],
  exports: [PushService, TypeOrmModule]
})
export class PushModule {}
