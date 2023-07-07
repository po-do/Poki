import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocketConnectionRepository } from './video-chat.repository';

@Injectable()
export class VideoChatService {
    constructor(
        @InjectRepository(SocketConnectionRepository)
        private socketConnectionRepository: SocketConnectionRepository
    ) {}

    async createSocketConnection(user_id: string, socket_id: string): Promise <void> {
        return await this.socketConnectionRepository.createSocketConnection(user_id, socket_id);
    }

    async findConnectionBySocketId(socket_id: string): Promise<string> {
        const socket_connection = await this.socketConnectionRepository.findOneBy({socket_id: socket_id});
        if (!socket_connection) {
            //console.log(`${socket_id}를 찾을 수 없습니다.`);
            throw new NotFoundException(`${socket_id}를 찾을 수 없습니다.`);
        }
        return socket_connection?.user_id;
    }

    async findConnectionByUserId(user_id: string): Promise<string> {
        const socket_connection = await this.socketConnectionRepository.findOneBy({user_id: user_id});

        if (!socket_connection) {
            // console.log(`${user_id}를 찾을 수 없습니다.`);
            throw new NotFoundException(`${user_id}를 찾을 수 없습니다.`);
        }  
        return socket_connection?.socket_id;
    }

    async deleteConnection(user_id: string): Promise <void> {
        console.log(user_id, 'userid')
        const result = await this.socketConnectionRepository.delete({user_id: user_id});
        if (result.affected === 0) {
            //throw new NotFoundException(`${user_id}를 삭제할 수 없습니다.`)
            console.log(`${user_id}를 삭제할 수 없습니다.`)
        }
    }

}

