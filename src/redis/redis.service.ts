import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
    private redisClient: Redis;
    private cacheCapacity: number = 3; // 조절 요망, n개의 캐시 저장 가능
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

    async set(key: string, data: any, ttl: number): Promise<void> {
        //await this.redisClient.set(key, serializedData, 'EX', ttl);
        await this.redisClient.lpush(key, ...data);
        await this.redisClient.expire(key, ttl);
        if (await this.isCacheFull()) {
            console.log('cache is full!')
            await this.evictLFUItems(); // 조절 요망, 가장 적게 참조된 key 삭제
        }
    }

    async delete(key: string): Promise<void> {
        await this.redisClient.del(key);
    }

    async evictLFUItems(): Promise<void> {
        const items = await this.redisClient.zrange('cache', 0, -1, 'WITHSCORES');
        console.log(items)
        await this.redisClient.del(items[0])
        await this.redisClient.zrem('cache', items[0]).then(async()=>{
            if (!await this.isCacheFull()) {
                console.log('this is full');
            }
            else {
                console.log('예측대로!')
                const items = await this.redisClient.zrange('cache', 0, -1, 'WITHSCORES');
                console.log(items)
            }
        }
        );
    }

    async increaseFrequency(key: string): Promise<void> {
        await this.redisClient.zincrby('cache', 1, key);
    }

    private async isCacheFull(): Promise<boolean> {
        const cacheSize = await this.redisClient.zcard('cache');
        console.log(cacheSize)
        return cacheSize >= this.cacheCapacity;
    }
}
