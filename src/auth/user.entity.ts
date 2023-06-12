import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['user_id'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: string;

    @Column()
    user_name: string;

    @Column()
    password: string;
    
    // code 값이 회원가입시 null, 후에 발급되므로
    // nullable하지만, code 컬럼은 비어지면 안되므로 code?: string 로 처리 x
    @Column({ nullable: true })
    code: string;
    
    @Column()
    type: string;
}