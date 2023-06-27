import { Module } from '@nestjs/common';
import { EventGateway } from './event.gateway';
import { EventService } from './event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationRepository } from './repository/conversation.repository';
import { MessageRepository } from './repository/message.repository';
import { EventController } from './event.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UserRepository } from 'src/auth/user.repository';
import { VideoChatModule } from 'src/video-chat/video-chat.module';
import { PushService } from 'src/push/push.service';
import * as redisStore from 'cache-manager-redis-store'
import { CacheModule } from '@nestjs/cache-manager';
import * as config from 'config';

const redisConfig = config.get('redis');

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ConversationRepository,
            MessageRepository,
            UserRepository,
        ]),
        AuthModule,
        VideoChatModule,
        CacheModule.register({
            store: redisStore,
            host: redisConfig.host,
            port: redisConfig.port,
            password: redisConfig.password
          }),
    ],
    providers: [
        EventGateway, 
        EventService,
        ConversationRepository,
        MessageRepository,
        UserRepository,
        JwtService,
        AuthService,
        JwtStrategy,
        PushService
    ],
    controllers: [EventController],
    exports: [EventGateway, EventService, TypeOrmModule],
})

export class EventModule {}
