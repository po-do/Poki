import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WishlistRepository } from './wishlist.repository';
import { Wishlist } from './wishlist.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class WishlistService {
    constructor(
        @InjectRepository(WishlistRepository)
        private wishlistRepository: WishlistRepository,
    ) { }

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
}
