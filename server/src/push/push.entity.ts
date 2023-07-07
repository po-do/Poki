import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../auth/user.entity";

@Entity()
export class PushConnection extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fcm_token: string;

    @CreateDateColumn({ type: "timestamp" })
    last_login_time: Date;

    @ManyToOne(type => User, user => user.push_connection, {eager: false})
    user: User;
}
