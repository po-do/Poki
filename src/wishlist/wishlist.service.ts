import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WishlistRepository } from './wishlist.repository';
import { Wishlist } from './wishlist.entity';
import { NotFoundException } from '@nestjs/common';
import { GivenStatus, PickedStatus } from './wishlist-status';

@Injectable()
export class WishlistService {
    constructor(
        @InjectRepository(WishlistRepository)
        private wishlistRepository: WishlistRepository,
    ) { }

    async getWishlistById(id: number): Promise<Wishlist> {
        const found = await this.wishlistRepository.findOneBy({id});

        if (!found) {
            throw new NotFoundException(`Wishlist with ID "${id}" not found`);
        }

        return found;
    }


    createWishlist(createWishlistDto): Promise<Wishlist> {
        return this.wishlistRepository.createWishlist(createWishlistDto);
    }

    async deleteWishlist(id: number): Promise<{ code: number; success: boolean }> {
        const result = await this.wishlistRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Can't find board with id ${id}`);
          }

        console.log(`Wishlist with ID "${id}" deleted`);

        return {code: 200, success: true}
    }

    async updateWishlistPickStatus(id: number, pickStatus: PickedStatus): Promise<Wishlist> {
        const wishlist = await this.getWishlistById(id);
        wishlist.Picked = pickStatus;
        
        await this.wishlistRepository.save(wishlist);
        return wishlist;
    }

    async updateWishlistGivenStatus(id: number, givenStatus: GivenStatus): Promise<Wishlist> {
        const wishlist = await this.getWishlistById(id);
        console.log(givenStatus);
        console.log(id);
        wishlist.Given = givenStatus;
        
        await this.wishlistRepository.save(wishlist);
        return wishlist;

    }

    async updateWishlist(Wishlistid: number, createWishlistDto): Promise<Wishlist> {
        const wishlist = await this.getWishlistById(Wishlistid);
        wishlist.ProductName = createWishlistDto.ProductName;
        wishlist.ProductLink = createWishlistDto.ProductLink;
        
        await this.wishlistRepository.save(wishlist);
        return wishlist;
    }

}
