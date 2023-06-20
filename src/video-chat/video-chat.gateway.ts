import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket, WebSocketServer, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from "socket.io"
import { SocketConnection } from './video-chat.entity';
import { Logger } from '@nestjs/common';
import { VideoChatService } from './video-chat.service';

@WebSocketGateway({
  namespace: 'video-chat',
  cors: {
    cors: {
      origin: "http://localhost:3000",
      methods: [ "GET", "POST" ]
    }
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
    socket.emit("me", socket.id)
  }

  @SubscribeMessage('setUserName')
  handleSetUserName(
    @MessageBody() data: {user_id: string},
    @ConnectedSocket() socket: Socket
    ) {
    this.videoChatService.createSocketConnection(data.user_id, socket.id);
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    const disconnectedUser = await this.videoChatService.findConnectionBySocketId(socket.id);
		if (disconnectedUser) {
			this.videoChatService.deleteConnection(disconnectedUser)
		}
    this.logger.log("disconnection 발생 😀")
		socket.broadcast.emit("callEnded")
  }

  @SubscribeMessage('callUser')
  async handleCallUser(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: {userToCall: string; signalData: any; from: any; name: string}) {
    const {userToCall, signalData, from, name} = data;

    const userToCallId = await this.videoChatService.findConnectionByUserId(userToCall);

		if (userToCallId) {
			this.server.to(userToCallId).emit("callUser", { signal: signalData, from, name })
		} else {
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
