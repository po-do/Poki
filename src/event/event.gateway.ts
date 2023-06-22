import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, Injectable } from '@nestjs/common';
import { EventService } from './event.service';
import { User } from 'src/auth/user.entity';
import { AuthService } from 'src/auth/auth.service';


interface MessagePayload {
  roomName: string;
  message: string;
  user: User;
}

let createRooms: string[] = [];

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
  },
})

@Injectable()
export class EventGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  videoChatService: any;
  constructor(
    private eventService: EventService,
    private authService: AuthService,
  ) {}

  private logger = new Logger('Gateway');

  @WebSocketServer()
  public server: Server;

  afterInit() {}

  // handleConnection(@ConnectedSocket() socket: Socket) {
  //   this.logger.log(`Socket ${socket.id} connected`);
  // }

  // handleDisconnect(@ConnectedSocket() socket: Socket) {
  //   this.logger.log(`Socket ${socket.id} disconnected`);
  // }

  handleConnection(@ConnectedSocket() socket: Socket): any { 
    console.log("connection 발생 😁")
    socket.emit("me", socket.id)
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`Socket ${socket.id} disconnected`);
  }

  @SubscribeMessage('setUserName')
  handleSetUserName(
    @MessageBody() data: {user_id: string},
    @ConnectedSocket() socket: Socket
    ) {
    this.videoChatService.createSocketConnection(data.user_id, socket.id);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() { roomName, message, user }: MessagePayload,
  ) {
    // Save message in database
    this.eventService.createMessage(user.user_id, message, roomName, user.id);

    socket.to(roomName).emit('message', { sender_id: user.user_id, message });
    return { sender_id: user.user_id, message, check_id: user.id };
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
    this.server.emit('delete-room', roomName);
    this.server.emit('room-list', createRooms); // 방 목록 갱신

    return { success: true };
  }

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

    //now_user의 코드 길이가 4글자 이하이면 오류 발생
    if (now_user.code.length <= 4) {
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

  @SubscribeMessage('leave-room')
  handleLeaveRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() roomName: string,
  ) {
    socket.leave(roomName);
    return { success: true };
  }

  @SubscribeMessage('disconnect')
  async handleDisconnectSocket(@ConnectedSocket() socket: Socket) {
    try {
      const disconnectedUser = await this.videoChatService.findConnectionBySocketId(socket.id);
      if (disconnectedUser) {
        this.videoChatService.deleteConnection(disconnectedUser)
      }
      this.logger.log("disconnection 발생 😀, 삭제 완료")
      socket.broadcast.emit("callEnded")
    } catch (error) {
      // this.logger.error("findConnectionBySocketId 예외 발생 😂", error, "this is error")
    }
  }

  @SubscribeMessage('callUser')
  async handleCallUser(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: {userToCall: string; signalData: any; from: any; name: string}) {
    const {userToCall, signalData, from, name} = data;

    try {
      const userToCallId = await this.videoChatService.findConnectionByUserId(userToCall);

      if (userToCallId) {
        this.server.to(userToCallId).emit("callUser", { signal: signalData, from, name })
      } else {
        socket.emit("noUserToCall", userToCall);
      }
    } catch (error) {
      socket.emit("noUserToCall", userToCall);
    }
  }

  @SubscribeMessage('answerCall')
  handleAnswerCall(
    @ConnectedSocket() socket: Socket, 
    @MessageBody() data: {to: string, signal: any}) {
    const {to, signal} = data;
		this.server.to(to).emit("callAccepted", signal)
  }
}