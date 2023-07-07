import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import * as config from 'config';

const redisConfig = config.get('redis');

const cacheModule = CacheModule.register({
  useFactory: async () => ({
    store: redisStore,
    host: redisConfig.host,
    port: redisConfig.port,
    password: redisConfig.password,
    // ttl: 1000 // 조절 요망, cache 유지 시간 
  })
})

@Module({
  imports: [cacheModule],
  providers: [RedisService],
  exports: [RedisService]
})
export class RedisModule {}
