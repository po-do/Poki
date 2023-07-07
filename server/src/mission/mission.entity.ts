import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { MissionStatus } from "./mission-status.enum";

@Entity()
export class Mission extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: string;

    @Column()
    content: string;

    @Column()
    status: MissionStatus;

    @Column()
    created_date: string // 후에 Date type으로 수정 예정

    @Column()
    completed_date: string
}