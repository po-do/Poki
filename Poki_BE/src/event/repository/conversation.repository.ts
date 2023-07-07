import { Injectable } from "@nestjs/common/decorators";
import { Repository, DataSource } from "typeorm";
import { Conversation } from "../entity/conversation.entity";
import { User } from "src/auth/user.entity";


@Injectable()
export class ConversationRepository extends Repository<Conversation> {
    constructor(private dataSource: DataSource) {
        super(Conversation, dataSource.createEntityManager());
    }

    async createRoom(now_user: User, child_id:string, parent_id:string, roomName:string): Promise<{ code: number; success: boolean, Data:any }> {
       
        const Room = this.create({
            name: roomName,
            child_id,
            parent_id,
            coad: now_user.code,
        });

        await this.save(Room);

        return {
            code: 200,
            success: true,
            Data: {
                Room
            }
        };


    }
}
