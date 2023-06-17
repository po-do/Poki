import { Injectable } from "@nestjs/common/decorators";
import { Repository, DataSource } from "typeorm";
import { Message } from "../entity/message.entity";


@Injectable()
export class MessageRepository extends Repository<Message> {
    constructor(private dataSource: DataSource) {
        super(Message, dataSource.createEntityManager());
    }

    async createMessage(socket_id, message, conversation_id): Promise<{ code: number; success: boolean, Data:any }> {
        console.log(conversation_id);
               
        const Message = this.create({
            conversation_id: conversation_id,
            sender_id: socket_id,
            text: message,
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

