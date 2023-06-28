import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ChatSocketConnection } from "../entity/event.entity";


@Injectable()
export class ChatSocketConnectionRepository extends Repository<ChatSocketConnection> {
    constructor(private dataSource: DataSource) {
        super(ChatSocketConnection, dataSource.createEntityManager());
    }

    async createSocketConnection(user_id: string, socket_id: string): Promise <void> {
        let socketConnection = await this.findOneBy({ user_id });
        if (socketConnection) {
          // 이미 소켓 연결이 존재하는 경우
          socketConnection.socket_id = socket_id;

          await this.save(socketConnection);
        } else {
          // 소켓 연결이 존재하지 않는 경우
          socketConnection = this.create({
            user_id,
            socket_id
          });
          await this.save(socketConnection);
        }
    }
}