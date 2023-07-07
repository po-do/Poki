import { Injectable } from "@nestjs/common/decorators";
import { Repository, DataSource } from "typeorm";
import { Message } from "../entity/message.entity";

@Injectable()
export class MessageRepository extends Repository<Message> {
    constructor(private dataSource: DataSource) {
        super(Message, dataSource.createEntityManager());
    }

    async createMessage(user_id, message, room_name, id, user_name): Promise<{ code: number; success: boolean, Data:any }> {
        
               
        const Message = this.create({
            conversation_id: room_name,
            sender_id: user_id,
            sender_name: user_name,
            message,
            check_id: id,
            createdAt: new Date()
        });

        await this.save(Message);

        return {
            code: 200,
            success: true,
            Data: {
                Message
            }
        };  
    }

}

