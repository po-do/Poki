import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['userid'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userid: string;

    @Column()
    username: string;

    @Column()
    password: string;
    
    @Column({ nullable: true })
    code: string;
    
    @Column()
    type: string;
}