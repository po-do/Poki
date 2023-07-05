import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConversationRepository } from './repository/conversation.repository';
import { MessageRepository } from './repository/message.repository';
import { User } from 'src/auth/user.entity';
import { Conversation } from './entity/conversation.entity';
import { Message } from './entity/message.entity';
import { ChatSocketConnectionRepository } from './repository/event.repository';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(MessageRepository)
        @InjectRepository(ConversationRepository)
        @InjectRepository(ChatSocketConnectionRepository)
        private messageRepository: MessageRepository,
        private conversationRepository: ConversationRepository,
        private chatSocketConnectionRepository: ChatSocketConnectionRepository,
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

    async createMessage(user_id:string, message:string, room_name:string, id:number, user_name:string): Promise<{ code: number; success: boolean, Data:any }> {
        return this.messageRepository.createMessage(user_id, message, room_name, id, user_name);
    }

    async getMessage(room_name: string): Promise<Message[]> {
        const messages = await this.messageRepository
          .createQueryBuilder('message')
          .where('message.conversation_id = :room_name', { room_name })
          .orderBy('message.createdAt', 'ASC')
          .getMany();
      
        return messages ;
      }

      async createChatSocketConnection(user_id: string, socket_id: string): Promise <void> {
        return await this.chatSocketConnectionRepository.createSocketConnection(user_id, socket_id);

      }

      async findChatConnectionBySocketId(socket_id: string): Promise<string> {
        const chatsocket_connection = await this.chatSocketConnectionRepository.findOneBy({socket_id: socket_id});
        if (!chatsocket_connection) {
            //console.log(`${socket_id}를 찾을 수 없습니다.`);
            throw new NotFoundException(`${socket_id}를 찾을 수 없습니다.`);
        }
        return chatsocket_connection?.user_id;

    }

    async deleteChatConnection(user_id: string): Promise <void> {
        // console.log(user_id, 'userid')
        const result = await this.chatSocketConnectionRepository.delete({user_id: user_id});
        if (result.affected === 0) {
            //throw new NotFoundException(`${user_id}를 삭제할 수 없습니다.`)
            console.log(`${user_id}를 삭제할 수 없습니다.`)
        }
    }

    // 유저의 아이디가 chat_socket_connection 테이블에 존재하는지 확인
    async checkChatConnection(user_id: string): Promise<boolean> {
        const chatsocket_connection = await this.chatSocketConnectionRepository.findOneBy({user_id: user_id});
        if (chatsocket_connection) {
            return true;
        }
        return false;
    }
        
}
