import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConversationRepository } from './repository/conversation.repository';
import { MessageRepository } from './repository/message.repository';
import { User } from 'src/auth/user.entity';
import { CreateConversationDto } from './dto/event.dto';
import { Conversation } from './entity/conversation.entity';
import { CreateMessageDto } from './dto/event.dto';
import { Message } from './entity/message.entity';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(MessageRepository)
        @InjectRepository(ConversationRepository)
        private messageRepository: MessageRepository,
        private conversationRepository: ConversationRepository,
    ) { }

    async createRoom(user:User, createConversationDto: CreateConversationDto): Promise<{ code: number; success: boolean, Data:any }> {
        return this.conversationRepository.createRoom(user, createConversationDto);

    }

    async getRoom(user: User): Promise<Conversation> {
        console.log(user.user_id);
        if (user.type === 'CHILD'){
            
            const conversation = await this.conversationRepository.findOneBy({child_id: user.user_id});
            return conversation
        }

        const conversation = await this.conversationRepository.findOneBy({parent_id: user.user_id});

        return conversation

    }

    async createMessage(socket_id:string, message:string, converstation_id:string): Promise<{ code: number; success: boolean, Data:any }> {
        return this.messageRepository.createMessage(socket_id, message, converstation_id);
    }

    async getMessage(user: User, room_id: string): Promise<Message[]> {
        const messages = await this.messageRepository
          .createQueryBuilder('message')
          .where('message.conversation_id = :room_id', { room_id })
          .orderBy('message.timestamp', 'ASC')
          .getMany();
      
        return messages ;
      }
        






}
