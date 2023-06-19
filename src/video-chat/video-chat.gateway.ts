import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket, WebSocketServer, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from "socket.io"
import { users } from './users';

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
  @WebSocketServer() public server: Server;

  afterInit(server: Server) {
    
  }

  handleConnection(@ConnectedSocket() socket: Socket): any { 
    socket.emit("me", socket.id)
  }

  @SubscribeMessage('setUserName')
  handleSetUserName(
    @MessageBody() data: {name: string},
    @ConnectedSocket() socket: Socket
    ) {
    users[data.name] = socket.id;
  }

  @SubscribeMessage('disconnect')
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    const disconnectedUser = Object.keys(users).find((key)=> users[key] === socket.id)
		if (disconnectedUser) {
			delete users[disconnectedUser];
		}
		socket.broadcast.emit("callEnded")
  }

  @SubscribeMessage('callUser')
  handleCallUser(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: {userToCall: string; signalData: any; from: any; name: string}) {
    const {userToCall, signalData, from, name} = data;

		const userToCallId = users[userToCall];

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
