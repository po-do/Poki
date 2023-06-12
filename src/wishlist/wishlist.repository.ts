import { Wishlist } from "./wishlist.entity";
import { Repository, DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";
import { GivenStatus, PickedStatus } from "./wishlist-status";
import { User } from "src/auth/user.entity";
import { wishProudctDto } from "./dto/responss-wishlist.dto";

@Injectable()
export class WishlistRepository extends Repository<Wishlist> {
    constructor(private dataSource: DataSource) {
        super(Wishlist, dataSource.createEntityManager());
    }

    async createWishlist(createWishlistDto, type: string, code: string, id: number): Promise<wishProudctDto> {
      const { ProductName, ProductLink } = createWishlistDto;
    
      const wishlist = this.create({
        ProductName,
        ProductLink,
        Given: GivenStatus.FALSE,
        Picked: PickedStatus.FALSE,
        user: { id, code, type }
      });
    
      await this.save(wishlist);
    
      const { id: itemId, Given, Picked } = wishlist;
      
      const item : wishProudctDto = {
            id: itemId,
            ProductName,
            ProductLink,
            Given,
            Picked
          };
    
      return item;
    }
}