import { Module } from '@nestjs/common';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { WishlistRepository } from './wishlist.repository';
import { UserRepository } from 'src/auth/user.repository';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { BoardService } from 'src/board/board.service';
import { BoardRepository } from 'src/board/board.repository';
import { PushService } from 'src/push/push.service';
import { PushConnectionRepository } from 'src/push/push-connection.repository';
import * as redisStore from 'cache-manager-redis-store'
import { CacheModule } from '@nestjs/cache-manager';
import * as config from 'config';

const redisConfig = config.get('redis');

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WishlistRepository,
      UserRepository,
      PushConnectionRepository,
     ]),
    AuthModule,
    CacheModule.register({
      store: redisStore,
      host: redisConfig.host,
      port: redisConfig.port,
      password: redisConfig.password
    }),
  ],
  controllers: [WishlistController],
  providers: [
    WishlistService, 
    WishlistRepository,
    PushConnectionRepository,
    AuthService,
    JwtStrategy,
    UserRepository,
    JwtService,
    BoardService,
    BoardRepository,
    PushService
],
})
export class WishlistModule {}
