import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket, WebSocketServer, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from "socket.io"
import { SocketConnection } from './video-chat.entity';
import { Logger } from '@nestjs/common';
import { VideoChatService } from './video-chat.service';
import * as config from 'config';

const conrsConfig = config.get('cors');

const connect_socket: {socket_nickname: string, socket_id: string;}[]= [];

class ExtendedSocket extends Socket {
  nickname: string;
}


@WebSocketGateway({
  namespace: 'video-chat',
    cors: {
      origin: [conrsConfig.url],
      methods: [ "GET", "POST" ]
  }
})

export class VideoChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor (
    private videoChatService: VideoChatService
  ) {};

  @WebSocketServer() public server: Server;
  private logger = new Logger('Gateway');

  afterInit(server: Server) {
    
  }

  handleConnection(@ConnectedSocket() socket: Socket): any { 
    console.log("connection 발생 😁")
    socket.emit("me", socket.id)
  }

  @SubscribeMessage('setUserName')
  async handleSetUserName(
    @MessageBody() data: {user_id: string},
    @ConnectedSocket() socket: ExtendedSocket
    ) {
      const existingSocketIndex = connect_socket.findIndex((s) => s.socket_nickname === data.user_id);

      if (existingSocketIndex === -1) {
        socket.nickname = data.user_id;
        connect_socket.push({
          socket_nickname: socket.nickname,
          socket_id: socket.id,
        });
      };

    await this.videoChatService.createSocketConnection(data.user_id, socket.id);
  }

  getSocketIdByNickname(nickname: string, socketList: { socket_nickname: string, socket_id: string; }[]): string | undefined {
    const socket = socketList.find((s) => s.socket_nickname === nickname);
    return socket ? socket.socket_id : undefined;
  }

  @SubscribeMessage('disconnect')
  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    try {
      const disconnectedUser = await this.videoChatService.findConnectionBySocketId(socket.id);
      if (disconnectedUser) {
        this.videoChatService.deleteConnection(disconnectedUser)
      }
      this.logger.log("disconnection 발생 😀, 삭제 완료")
      socket.broadcast.emit("callEnded")
    } catch (error) {
    }
  }

  @SubscribeMessage('callUser')
  async handleCallUser(
    @ConnectedSocket() socket: ExtendedSocket,
    @MessageBody() data: {userToCall: string; signalData: any; from: any; name: string}) {
      console.log('calluser')
      const {userToCall, signalData, from, name} = data;
      console.log(userToCall)
      console.log(connect_socket)
      
      try{
        const socketId = this.getSocketIdByNickname(userToCall, connect_socket);
        console.log(socketId)
        if (socketId) {
          this.server.to(socketId).emit("callUser", {signal: signalData, from, name})
        } else {
          socket.emit("noUserToCall", userToCall);
        } 
      } catch (error) {
        socket.emit("noUserToCall", userToCall);
      }

      //connect_socket 초기화
      connect_socket.splice(0, connect_socket.length);
      console.log(connect_socket)

      // try {
      //   const userToCallId = await this.videoChatService.findConnectionByUserId(userToCall);
  
      //   if (userToCallId) {
      //     this.server.to(userToCallId).emit("callUser", { signal: signalData, from, name })
      //   } else {
      //     socket.emit("noUserToCall", userToCall);
      //   }
      // } catch (error) {
      //   socket.emit("noUserToCall", userToCall);
      // }

  }

  @SubscribeMessage('answerCall')
  handleAnswerCall(
    @ConnectedSocket() socket: ExtendedSocket, 
    @MessageBody() data: {to: string, signal: any}) {
    const {to, signal} = data;
		this.server.to(to).emit("callAccepted", signal)
  }
}
