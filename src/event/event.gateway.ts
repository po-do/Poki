
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { EventService } from './event.service';
import { User } from 'src/auth/user.entity';
import { AuthService } from 'src/auth/auth.service';




interface MessagePayload {
    roomName: string;
    message: string;
    user:User;
}

let createRooms: string[] = []; 


@WebSocketGateway({
    namespace: 'chat',
    cors: {
      origin: ['http://localhost:3000'],
    },
  })


export class EventGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
    constructor (
        private EventService: EventService,
        private AuthService: AuthService,
        ) {}

    private logger = new Logger('Gateway');

    @WebSocketServer() public nsp: Namespace;

    afterInit() {
    }

    handleConnection(@ConnectedSocket() socket: Socket) {
        this.logger.log(`Socket ${socket.id} connected`);

        // socket.broadcast.emit('message', {
        //     // message: `Socket ${socket.id} comming!`,
        //     });

    }
    

    handleDisconnect(@ConnectedSocket() socket: Socket) {
        this.logger.log(`Socket ${socket.id} disconnected`);
    }

   
    @SubscribeMessage('message')
    async handleMessage(
        @ConnectedSocket() socket: Socket,
        @MessageBody() {roomName, message, user}: MessagePayload,
    ) {
        
        //save message in databa
        this.EventService.createMessage(user.user_id, message, roomName, user.id);

        const now_user =  await this.AuthService.getUserById(user.id);

        socket.to(roomName).emit('message', { sender_id: user.user_id, message});
        return { sender_id: user.user_id, message, check_id: user.id};
    }

    @SubscribeMessage('room-list')
    handleRoomList() {
        return createRooms;
    }

    @SubscribeMessage('delete-room')
    handleDeleteRoom(
        @ConnectedSocket() socket: Socket,
        @MessageBody() roomName: string,
    ) {
        socket.leave(roomName);
        createRooms = createRooms.filter((createRoom) => createRoom !== roomName);
        this.nsp.emit('delete-room', roomName);
        this.nsp.emit('room-list', createRooms); // 방 목록 갱신
    
        return { success: true };
    }

    @SubscribeMessage('create-room')
    async handleCreateRoom(
        @ConnectedSocket() socket: Socket,
        @MessageBody() {roomName, user}: MessagePayload,
    ) {
        
        const exists = createRooms.find((createRoom) => createRoom === roomName);
        if (exists) {
            return { success: false,  payload: `Room ${roomName} already exists`};
        }

        const now_user =  await this.AuthService.getUserById(user.id);
        
        const parent_id = user.user_id;
        const child_id = await this.AuthService.getConnectedUser_id(user);
        
        if (now_user.type === 'CHILD'){
            const child_id = user.user_id;

            const parent_id = await this.AuthService.getConnectedUser_id(user);

            this.EventService.createRoom(now_user, child_id, parent_id, roomName);
        } else {

            this.EventService.createRoom(now_user, child_id, parent_id, roomName);
        }
        //save room in database
        socket.join(roomName);
        createRooms.push(roomName);
        this.nsp.emit('create-room', roomName);

        return { success: true, payload: roomName};

    }

    @SubscribeMessage('join-room')
    handleJoinRoom(
        @ConnectedSocket() socket: Socket,
        @MessageBody() roomName: string,
    ) {
        socket.join(roomName);
        // socket.broadcast.to(roomName).emit('message', { message: `Socket ${socket.id} comming!`});

        return { success: true };
    }
    
    @SubscribeMessage('leave-room')
    handleLeaveRoom(
        @ConnectedSocket() socket: Socket,
        @MessageBody() roomName: string,
    ) {
        socket.leave(roomName);
        // socket.broadcast.to(roomName).emit('message', { message: `Socket ${socket.id} leaving!`});

        return { success: true };
    }
}
