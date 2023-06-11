import { Wishlist } from "./wishlist.entity";
import { Repository, DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";
import { GivenStatus, PickedStatus } from "./wishlist-status";
//import { User } from "src/auth/user.entity";

@Injectable()
export class WishlistRepository extends Repository<Wishlist> {
    constructor(private dataSource: DataSource) {
        super(Wishlist, dataSource.createEntityManager());
    }

    async createWishlist(createWishlistDto): Promise<{ code: number; success: boolean; data: { item: Wishlist } }> {
        const {ProductName, ProductLink} = createWishlistDto;

        const wishlist = this.create({
            ProductName,
            ProductLink,
            Given: GivenStatus.FALSE,
            Picked: PickedStatus.FALSE,
            //user
        });

        await this.save(wishlist);
        const response = {
            code: 200,
            success: true,
            data: {
              item: wishlist,
            },
          };
          return response;
    }
}