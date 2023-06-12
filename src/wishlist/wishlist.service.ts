import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WishlistRepository } from './wishlist.repository';
import { Wishlist } from './wishlist.entity';
import { GivenStatus, PickedStatus } from './wishlist-status';
import { wishProudctDto } from './dto/response-wishlist.dto';

@Injectable()
export class WishlistService {
    constructor(
        @InjectRepository(WishlistRepository)
        private wishlistRepository: WishlistRepository,
    ) { }

    async getWishlistByUserId(user_id: number): Promise<Wishlist[]> {
        const query = this.wishlistRepository.createQueryBuilder('wishlist');
        query.where('wishlist.userId = :userId', {userId: user_id});

        if (!query) {
            throw new NotFoundException(`Wishlist with user ID "${user_id}" not found`);
        }
        const wishlists = await query.getMany();
        
        return wishlists;
    }

    // async getWishlistById(id: number): Promise<Wishlist> {
    //     const found = await this.wishlistRepository.findOneBy({id});

    //     if (!found) {
    //         throw new NotFoundException(`Wishlist with ID "${id}" not found`);
    //     }

    //     return found;
    // }
    
    async getWishlistById(id: number): Promise<Wishlist> {
      return this.wishlistRepository
        .createQueryBuilder('wishlist')
        .leftJoinAndSelect('wishlist.user', 'user')
        .select(['wishlist.id', 'wishlist.ProductName', 'wishlist.ProductLink', 'wishlist.Given', 'wishlist.Picked', 'user.id'])
        .where('wishlist.id = :id', { id })
        .getOne();
    }


    createWishlist(createWishlistDto,type:string, code:string, id:number): Promise<wishProudctDto> {
        return this.wishlistRepository.createWishlist(createWishlistDto, type, code, id);
    }

    async deleteWishlist(id: number): Promise<{ code: number; success: boolean }> {
        const result = await this.wishlistRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Can't find board with id ${id}`);
          }

        console.log(`Wishlist with ID "${id}" deleted`);

        return {code: 200, success: true}
    }

    async updateWishlistPickStatus(id: number, pickStatus: PickedStatus): Promise<wishProudctDto> {
        const wishlist = await this.getWishlistById(id);
        wishlist.Picked = pickStatus;
        
        await this.wishlistRepository.save(wishlist);
       
        const { id: itemId, Given, Picked, ProductLink, ProductName } = wishlist;
        
        const item : wishProudctDto = {
              id: itemId,
              ProductName,
              ProductLink,
              Given,
              Picked
            };
        
        return item;
    }

    async updateWishlistGivenStatus(id: number, givenStatus: GivenStatus): Promise<wishProudctDto> {
        const wishlist = await this.getWishlistById(id);
        console.log(givenStatus);
        console.log(id);
        wishlist.Given = givenStatus;
        
        await this.wishlistRepository.save(wishlist);
        console.log(wishlist);

        const { id: itemId, Given, Picked, ProductLink, ProductName } = wishlist;
        
        const item : wishProudctDto = {
              id: itemId,
              ProductName,
              ProductLink,
              Given,
              Picked
            };
       
        return item;

    }

    async updateWishlist(Wishlistid: number, createWishlistDto, id:number): Promise<wishProudctDto> {
        const wishlist = await this.getWishlistById(Wishlistid);
        // console.log(wishlist);
        // console.log(id);

        if (id !== wishlist.user.id) {
            throw new ForbiddenException('You can only update your own wishlist.');
        } 
        
        wishlist.ProductName = createWishlistDto.ProductName;
        wishlist.ProductLink = createWishlistDto.ProductLink;
      
        await this.wishlistRepository.save(wishlist);
       
        
        const { id: itemId, Given, Picked, ProductLink, ProductName } = wishlist;
        
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
