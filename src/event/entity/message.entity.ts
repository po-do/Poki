import { BaseEntity, Column, Entity, PrimaryColumn, CreateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Message extends BaseEntity {
    @PrimaryColumn('uuid')
    id: string = uuidv4();

    // 채팅방 참여 명단
    @Column()
    conversation_id: string;

    @Column()
    sender_id: string;

    @Column()
    message: string;

    @Column()
    check_id: number;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;
}