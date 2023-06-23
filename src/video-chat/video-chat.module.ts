import { MiddlewareConsumer, Module } from '@nestjs/common';
import { VideoChatService } from './video-chat.service';
import { VideoChatGateway } from './video-chat.gateway';
import { SocketConnectionRepository } from './video-chat.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoChatController } from './video-chat.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SocketConnectionRepository
  ]),
  ],
  providers: [VideoChatService, VideoChatGateway, SocketConnectionRepository],
  exports: [VideoChatService],
  controllers: [VideoChatController]
})

export class VideoChatModule {}