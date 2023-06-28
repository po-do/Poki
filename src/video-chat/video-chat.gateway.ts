import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket, WebSocketServer, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from "socket.io"
import { SocketConnection } from './video-chat.entity';
import { Logger } from '@nestjs/common';
import { VideoChatService } from './video-chat.service';
import * as config from 'config';

const conrsConfig = config.get('cors');


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
    await this.videoChatService.createSocketConnection(data.user_id, socket.id);
  }

  @SubscribeMessage('disconnect')
  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log("disconnection 발생!")
    try {
      const disconnectedUser = await this.videoChatService.findConnectionBySocketId(socket.id);
      if (disconnectedUser) {
        this.videoChatService.deleteConnection(disconnectedUser)
      }
      this.logger.log("disconnection 발생 😀, 삭제 완료")
      //socket.broadcast.emit("callEnded")
    } catch (error) {
      console.log('An Error occured in disconnect socket')
    }
  }

  @SubscribeMessage('callEnd')
  async endCall(
    @ConnectedSocket() socket: ExtendedSocket
  ) {
    console.log('end call')
    socket.broadcast.emit("callEnded")
  }

  @SubscribeMessage('callUser')
  async handleCallUser(
    @ConnectedSocket() socket: ExtendedSocket,
    @MessageBody() data: { userToCall: string; signalData: any; from: any; name: string }) {
    console.log('calluser')
    const { userToCall, signalData, from, name } = data;
    console.log(userToCall)
    

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
    @ConnectedSocket() socket: ExtendedSocket, 
    @MessageBody() data: {to: string, signal: any}) {
    const {to, signal} = data;
		this.server.to(to).emit("callAccepted", signal)
  }
}
