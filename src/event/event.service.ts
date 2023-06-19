import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConversationRepository } from './repository/conversation.repository';
import { MessageRepository } from './repository/message.repository';
import { User } from 'src/auth/user.entity';
import { Conversation } from './entity/conversation.entity';
import { Message } from './entity/message.entity';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(MessageRepository)
        @InjectRepository(ConversationRepository)
        private messageRepository: MessageRepository,
        private conversationRepository: ConversationRepository,
    ) { }

    async createRoom(now_user: User, child_id:string, parent_id:string, roomName:string): Promise<{ code: number; success: boolean, Data:any }> {
        return this.conversationRepository.createRoom(now_user, child_id, parent_id, roomName);

    }

    async getRoom(user: User): Promise<Conversation> {
     
        if (user.type === 'CHILD'){
            
            const conversation = await this.conversationRepository.findOneBy({child_id: user.user_id});

            return conversation
        }

        const conversation = await this.conversationRepository.findOneBy({parent_id: user.user_id});

        return conversation

    }

    //참여하고 있는 방이 있는지 확인
    async checkRoom(user: User): Promise<boolean> {
        if (user.type === 'CHILD') {
            const conversation = await this.conversationRepository.findOneBy({child_id: user.user_id});

            if (conversation) {
                return true;
            }

            return false;
        }

        if (user.type === 'PARENT') {
            const conversation = await this.conversationRepository.findOneBy({parent_id: user.user_id});
            
            if (conversation) {
                return true;
            }

            return false;
        }
    }

    async createMessage(user_id:string, message:string, room_name:string, id:number): Promise<{ code: number; success: boolean, Data:any }> {
        return this.messageRepository.createMessage(user_id, message, room_name, id);
    }

    async getMessage(room_name: string): Promise<Message[]> {
        const messages = await this.messageRepository
          .createQueryBuilder('message')
          .where('message.conversation_id = :room_name', { room_name })
          .orderBy('message.createdAt', 'ASC')
          .getMany();
      
        return messages ;
      }
        






}
