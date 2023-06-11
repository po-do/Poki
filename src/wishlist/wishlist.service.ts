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
}
