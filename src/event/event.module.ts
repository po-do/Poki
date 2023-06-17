import { Module } from '@nestjs/common';
import { EventGateway } from './event.gateway';
import { EventService } from './event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationRepository } from './repository/conversation.repository';
import { MessageRepository } from './repository/message.repository';
import { EventController } from './event.controller';
import { AuthModule } from 'src/auth/auth.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([
            ConversationRepository,
            MessageRepository,
        ]),
        AuthModule,
    ],
    providers: [
        EventGateway, 
        EventService,
        ConversationRepository,
        MessageRepository,],
    controllers: [EventController],

})

export class EventModule {}
