import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { SocketConnection } from "./video-chat.entity";

@Injectable()
export class SocketConnectionRepository extends Repository<SocketConnection> {
    constructor(private dataSource: DataSource) {
        super(SocketConnection, dataSource.createEntityManager());
    }

    async createSocketConnection(user_id: string, socket_id: string): Promise <void> {
        const socketConnection = this.create({
            user_id,
            socket_id
        })

        await this.save(socketConnection);
    }
}