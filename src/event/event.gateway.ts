
import { ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Namespace } from 'socket.io';





// @WebSocketGateway({
    
//     namespace: 'chat',
//     cors: {
//       origin: ['http://localhost:3000'],
//     },
//   })

// export class EventGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
//     @WebSocketServer() nsp: Namespace;

//     // afterInit() {
//     //     this.nsp.adapter.on('create-room', (room) => {
//     //         this.logger.log(`Room ${room} was created`);
//     //     });
//     // }

//     handleConnection(@ConnectedSocket() socket: Socket) {}

//     handleDisconnect(@ConnectedSocket() socket: Socket) {}
// }
