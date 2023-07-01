import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
    private redisClient: Redis;
    private cacheCapacity: number = 4; // 조절 요망, n개의 캐시 저장 가능
    constructor(){
        this.redisClient = new Redis();
    }

    async get(key: string): Promise <any> {
        const reply = await this.redisClient.lrange(key, 0, -1);
        if (!reply) {
          return null;
        }
        console.log(reply)
        this.increaseFrequency(key);
        return reply;
    }

    async set(key: string, data: any, ttl: number, cacheFull: number): Promise<void> {
        //await this.redisClient.set(key, serializedData, 'EX', ttl);
        await this.redisClient.lpush(key, ...data);
        await this.redisClient.expire(key, ttl);

        if (await this.isCacheFull(cacheFull)) {
            await this.evictLFUItems(); // 가장 적게 참조된 key 삭제
        }
    }

    async delete(key: string): Promise<void> {
        await this.redisClient.del(key);
    }

    async evictLFUItems(): Promise<void> {
        const items = await this.redisClient.zrange('cache', 0, -1);

        for (const key of items) {
            const ttl = await this.redisClient.ttl(key);
            if (ttl === -1 || ttl === -2) {
                console.log('만료된 key: ', key, '삭제함')
                await this.redisClient.zrem('cache', key);
                return;
            }
        }

        if (items?.length > 0){
            console.log('삭제할 key: ', items[0])
            await this.redisClient.del(items[0])
            await this.redisClient.zrem('cache', items[0]);   
        }
    }

    async increaseFrequency(key: string): Promise<void> {
        await this.redisClient.zincrby('cache', 1, key);
    }

    private async isCacheFull(cacheFull: number): Promise<boolean> {
        const cacheSize = await this.redisClient.zcard('cache');
        console.log(cacheSize, '만큼 저장 중')
        // return cacheSize >= this.cacheCapacity;
        return cacheSize >= cacheFull;
    }
}
