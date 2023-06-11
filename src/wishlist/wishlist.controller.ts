import { Body, Controller, Get, Param, Post, Delete, Patch, ValidationPipe, UsePipes, ParseIntPipe, UseGuards, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { Wishlist } from './wishlist.entity';


@Controller('wishlist')
// @UseGuards(AuthGuard())

export class WishlistController {
    constructor(private wishlistService: WishlistService) { }

    @Post('/create')
    @UsePipes(ValidationPipe)
    createWishlist(
        @Body() CreateWishlistDto:CreateWishlistDto,
        // @GetUser() user:User,
    ): Promise<Wishlist> {
        // if (user.status !== 'child') {
        //     throw new ForbiddenException('Only children can create a wishlist.');
        // }
        return this.wishlistService.createWishlist(CreateWishlistDto);

    }

    @Delete('/:id')
    deleteWishlist(
        @Param('id', ParseIntPipe) id: number,
        // @GetUser() user: User,
    ): Promise<void> {
        // if (user.status !== 'child') {
        //     throw new ForbiddenException('Only children can delete a wishlist.');
        // }
        return this.wishlistService.deleteWishlist(id);
    }


}

