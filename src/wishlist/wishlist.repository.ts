import { Wishlist } from "./wishlist.entity";
import { Repository, DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class WishlistRepository extends Repository<Wishlist> {
    constructor(private dataSource: DataSource) {
        super(Wishlist, dataSource.createEntityManager());
    }

    async createWishlist(createWishlistDto): Promise<Wishlist> {
        const {ProductName, ProductLink} = createWishlistDto;

        const wishlist = this.create({
            ProductName,
            ProductLink,
        });

        await this.save(wishlist);
        return wishlist;
    }
}