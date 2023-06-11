import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WishlistRepository } from './wishlist.repository';
import { Wishlist } from './wishlist.entity';

@Injectable()
export class WishlistService {
    constructor(
        @InjectRepository(WishlistRepository)
        private wishlistRepository: WishlistRepository,
    ) { }

    createWishlist(createWishlistDto): Promise<Wishlist> {
        return this.wishlistRepository.createWishlist(createWishlistDto);
    }

    async deleteWishlist(id: number): Promise<void> {
        const result = await this.wishlistRepository.delete(id);

        if (result.affected === 0) {
            throw new Error(`Wishlist with ID "${id}" not found`);
        }

        console.log(`Wishlist with ID "${id}" deleted`);
    }
}
