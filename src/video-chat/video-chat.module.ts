import { MiddlewareConsumer, Module } from '@nestjs/common';
import { VideoChatService } from './video-chat.service';
import { VideoChatGateway } from './video-chat.gateway';
import { SocketConnectionRepository } from './video-chat.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoChatController } from './video-chat.controller';
import { MessageRepository } from 'src/event/repository/message.repository';
import { ConversationRepository } from 'src/event/repository/conversation.repository';
import { UserRepository } from 'src/auth/user.repository';
import { EventService } from 'src/event/event.service';
import { EventGateway } from 'src/event/event.gateway';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SocketConnectionRepository,
      MessageRepository,
      ConversationRepository,
      UserRepository,
    ])
  ],
  providers: [VideoChatService,
    EventService,
    EventGateway,
    SocketConnectionRepository,
    MessageRepository,
    ConversationRepository,
    AuthService,
    UserRepository,
    JwtService],
  exports: [VideoChatService],
  controllers: [VideoChatController]
})

export class VideoChatModule { }