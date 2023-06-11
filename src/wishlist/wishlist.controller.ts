import { Body, Controller, Get, Param, Post, Delete, Patch, ValidationPipe, UsePipes, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { Wishlist } from './wishlist.entity';


@Controller('reward')
// @UseGuards(AuthGuard())

export class WishlistController {
    constructor(private wishlistService: WishlistService) { }

    @Post('/create')
    @UsePipes(ValidationPipe)
    createWishlist(
        @Body() CreateWishlistDto:CreateWishlistDto
    ): Promise<Wishlist> {
        return this.wishlistService.createWishlist(CreateWishlistDto);

    }
}

