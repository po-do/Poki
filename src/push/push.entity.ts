import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../auth/user.entity";

@Entity()
export class PushConnection extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    fcm_token: string;

    @ManyToOne(type => User, user => user.push_connection, {eager: false})
    user: User;
}
