import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { GivenStatus, PickedStatus } from "./wishlist-status";
import { User } from "../auth/user.entity";


@Entity()
export class Wishlist extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ProductName: string;

    @Column()
    ProductLink: string;

    @Column()
    ProductImage: string;

    @Column()
    Given: GivenStatus;

    @Column()
    Picked: PickedStatus;

    //null 값 허용
    @Column({ nullable: true })
    GivenAt: Date;

    @CreateDateColumn({ type: "timestamp" })
    CreatedAt: Date;

    // Author is the user who created the wishlist
    @ManyToOne(type => User, user => user.wishlist, { eager: false })
    user: User;
}

    

