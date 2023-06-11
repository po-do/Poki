import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GivenStatus, PickedStatus } from "./wishlist-status";

@Entity()
export class Wishlist extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ProductName: string;

    @Column()
    ProductLink: string;

    @Column({ default: GivenStatus.FALSE})
    Given: GivenStatus;

    @Column({ default: PickedStatus.FALSE})
    Picked: PickedStatus;

    // Author is the user who created the wishlist
    // @ManyToOne(type => User, user => user.wishlist, { eager: false })
    // user: User;
}

    

