import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../auth/user.entity";

@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    //포도판 전체 포도수
    @Column()
    blank: number;

    // 포도판에 붙어있는 포도수
    @Column()
    full: number;

    @Column()
    total_grapes: number;

    // 포도의 상태가 붙힘인 경우
    @Column()
    attached_grapes: number;

    // 포도의 상태가 안붙힘인경우
    @Column()
    deattached_grapes: number;

    @ManyToOne(type => User, user => user.board, { eager: false })
    user: User;

}
