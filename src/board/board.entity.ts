import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../auth/user.entity";

@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    //포도판 전체 포도수
    @Column()
    total_grape: number;

    // 가지고 있는 포도알수 = (미션 완료 수)
    @Column()
    user_whole_grapes: number;

    // 포도에 붙어있는 포도알수
    @Column()
    attached_grapes: number;

    // 포도에서 붙혀지지 않은 포도알수 = (total_blanck - attached_grapes)
    // @Column()
    // deattached_grapes: number;

    // 대기중인 포도알 수(user_whole_grapes - attached_grapes)

    @ManyToOne(type => User, user => user.board, { eager: false })
    user: User;

}
