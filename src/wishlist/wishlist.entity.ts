import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Wishlist extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ProductName: string;

    @Column()
    ProductLink: string;

    // Author is the user who created the wishlist
    // @ManyToOne(type => User, user => user.wishlist, { eager: false })
    // user: User;
}

    

