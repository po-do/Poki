import { BaseEntity, Column, Entity, PrimaryColumn, CreateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Conversation extends BaseEntity {
    @PrimaryColumn('uuid')
    id: string = uuidv4(); // UUID 형식으로 변경

    @Column()
    name: string;

    // 채팅방 참여 명단
    @Column()
    parent_id: string;

    @Column()
    child_id: string;

    @Column()
    coad: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;
}