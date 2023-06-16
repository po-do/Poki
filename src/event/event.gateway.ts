
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Namespace, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { EventService } from './event.service';
import { GetUser } from 'src/decorators/get-user.decorator';




interface MessagePayload {
    roomName: string;
    message: string;
}

let createRooms: string[] = []; 


@WebSocketGateway({
    namespace: 'chat',
    cors: {
      origin: ['http://localhost:3000'],
    },
  })

// @UseGuards(AuthGuard())
export class EventGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
    constructor (private EventService: EventService) {}

    private logger = new Logger('Gateway');

    @WebSocketServer() public nsp: Namespace;

    afterInit() {
        this.nsp.adapter.on('delete-room', (room) => {
            const deltedRoom = createRooms.find(
                (createRoom) => createRoom === room,
            );
            if (!deltedRoom) return;

            this.nsp.emit('delete-room', deltedRoom);
            createRooms = createRooms.filter(
                (createRoom) => createRoom !== deltedRoom,
            );
        });
        this.logger.log('Initialized');
    }

    handleConnection(@ConnectedSocket() socket: Socket) {
        this.logger.log(`Socket ${socket.id} connected`);

        socket.broadcast.emit('message', {
            message: `Socket ${socket.id} comming!`,
            });
    
    }
    

    handleDisconnect(@ConnectedSocket() socket: Socket) {
        this.logger.log(`Socket ${socket.id} disconnected`);
    }

    @SubscribeMessage('message')
    handleMessage(
        @ConnectedSocket() socket: Socket,
        @MessageBody() {roomName, message}: MessagePayload,
    ) {
        
        //save message in databa
        

        console.log(socket.id);
        socket.to(roomName).emit('message', { username: socket.id, message});
        return { username: socket.id, message};
    }

    @SubscribeMessage('room-list')
    handleRoomList() {
        return createRooms;
    }

    @SubscribeMessage('create-room')
    handleCreateRoom(
        @ConnectedSocket() socket: Socket,
        @MessageBody() roomName: string,
        @GetUser() user: any,
    ) {
        const exists = createRooms.find((createRoom) => createRoom === roomName);
        if (exists) {
            return { success: false,  payload: `Room ${roomName} already exists`};
        }

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
        socket.broadcast.to(roomName).emit('message', { message: `Socket ${socket.id} comming!`});

        return { success: true };
    }
    
    @SubscribeMessage('leave-room')
    handleLeaveRoom(
        @ConnectedSocket() socket: Socket,
        @MessageBody() roomName: string,
    ) {
        socket.leave(roomName);
        socket.broadcast.to(roomName).emit('message', { message: `Socket ${socket.id} leaving!`});

        return { success: true };
    }
}
