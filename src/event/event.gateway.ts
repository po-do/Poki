import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, Injectable } from '@nestjs/common';
import { EventService } from './event.service';
import { User } from 'src/auth/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { PushService } from 'src/push/push.service';
import * as config from 'config';


const corsConfig = config.get('cors');

interface MessagePayload {
  roomName: string;
  message: string;
  user: User;
}

let createRooms: string[] = [];

@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: [corsConfig.url, 'http://localhost:3000'],
  },
})

@Injectable()
export class EventGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private pushService: PushService,
   
  ) {}

  private logger = new Logger('Gateway');

  @WebSocketServer()
  public server: Server;

  afterInit() {}

  handleConnection(@ConnectedSocket() socket: Socket): any { 
    console.log("connection 발생 😁")
  }

  // @SubscribeMessage('disconnect')
  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log("disconnection 발생 😀")
    try {
      const disconnectedUser = await this.eventService.findChatConnectionBySocketId(socket.id);
      if (disconnectedUser) {
        this.eventService.deleteChatConnection(disconnectedUser)
      }
      this.logger.log("disconnection 발생 😀, 삭제 완료")
      //socket.broadcast.emit("callEnded")
    } catch (error) {
      console.log('An Error occured in disconnect socket')
    }

  }

  @SubscribeMessage('setUserName')
  async handleSetUserName(
    @MessageBody() data: {user_id: string},
    @ConnectedSocket() socket: Socket
    ) {
    await this.eventService.createChatSocketConnection(data.user_id, socket.id);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() { roomName, message, user }: MessagePayload,
  ) {
    // Save message in database
    this.eventService.createMessage(user.user_id, message, roomName, user.id);

    socket.to(roomName).emit('message', { sender_id: user.user_id, message });
    
    const now_user = await this.authService.getUserById(user.id);

    // 채팅방에 상대방이 있는지 확인

    
    const connect_userId = await this.authService.getConnectedUser_id(now_user);
    
    const check = await this.eventService.checkChatConnection(connect_userId);

      if (!check) {
        const connect_id = await this.authService.getConnectedUser(now_user);
        const pushToken = await this.pushService.getPushToeknByUserId(connect_id);
        console.log(pushToken);
        console.log(message);

        const title = '새로운 메시지가 도착했습니다.';
        const info = message;
        await this.pushService.push_noti(pushToken, title, info);
    }

    return { sender_id: user.user_id, message, check_id: user.id };
  }

  // 삭제 금지
  @SubscribeMessage('room-list')
  handleRoomList() {
    return createRooms;
  }

  // @SubscribeMessage('delete-room')
  // handleDeleteRoom(
  //   @ConnectedSocket() socket: Socket,
  //   @MessageBody() roomName: string,
  // ) {
  //   socket.leave(roomName);
  //   createRooms = createRooms.filter((createRoom) => createRoom !== roomName);
  //   this.server.emit('delete-room', roomName);
  //   this.server.emit('room-list', createRooms); // 방 목록 갱신

  //   return { success: true };
  // }

  @SubscribeMessage('create-room')
  async handleCreateRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() { roomName, user }: MessagePayload,
  ) {
    // const exists = createRooms.find((createRoom) => createRoom === roomName);
    // if (exists) {
    //   return { number: 0, payload: `Room ${roomName} already exists` };
    // }

    const now_user = await this.authService.getUserById(user.id);

     //now_user의 코드 길이가 4글자 이하이거나 null 값이면  오류 발생
     if (now_user.code.length <= 4 || now_user.code === null) {
      return { number: 0, payload: `Parent-child connection is required` };

    }

    const checkRoom = await this.eventService.checkRoom(now_user);

    if (checkRoom) {
      const room = await this.eventService.getRoom(now_user);
      console.log(room.name);
      return { number: 2, payload: room.name };
    }

    const parent_id = user.user_id;
    const child_id = await this.authService.getConnectedUser_id(now_user);

    if (now_user.type === 'CHILD') {
      const child_id = user.user_id;

      const parent_id = await this.authService.getConnectedUser_id(now_user);

      this.eventService.createRoom(now_user, child_id, parent_id, roomName);
    } else {
      this.eventService.createRoom(now_user, child_id, parent_id, roomName);
    }

   
    socket.join(roomName);
    createRooms.push(roomName);
    this.server.emit('create-room', roomName);

    return { number: 1, payload: roomName };
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() roomName: string,
  ) {
    socket.join(roomName);
    return { success: true };
  }

  // @SubscribeMessage('leave-room')
  // handleLeaveRoom(
  //   @ConnectedSocket() socket: Socket,
  //   @MessageBody() roomName: string,
  // ) {
  //   socket.leave(roomName);
  //   return { success: true };
  // }

}