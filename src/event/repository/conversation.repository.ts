import { Injectable } from "@nestjs/common/decorators";
import { Repository, DataSource } from "typeorm";
import { Conversation } from "../entity/conversation.entity";


@Injectable()
export class ConversationRepository extends Repository<Conversation> {
    constructor(private dataSource: DataSource) {
        super(Conversation, dataSource.createEntityManager());
    }

    async createRoom(user, createConversationDto): Promise<{ code: number; success: boolean, Data:any }> {
       
        const Room = this.create({
            child_id: user.user_id,
            parent_id: createConversationDto.parent_id,
            coad: user.coad,
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
