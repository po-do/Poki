import { Body, Controller, Get, Param, Post, Delete, Patch, ValidationPipe, UsePipes, ParseIntPipe, UseGuards, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { Wishlist } from './wishlist.entity';
import { GivenStatus, PickedStatus } from './wishlist-status';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { GetUserType } from 'src/decorators/get-user.type.decorator';
import { GetUserId } from 'src/decorators/get-user.userid.decorator';
import { GetUserCode } from 'src/decorators/get-user.code.decorator';
import { responseWishlistDto } from './dto/responss-wishlist.dto';


@Controller('wishlist')
@UseGuards(AuthGuard())

export class WishlistController {
    constructor(private wishlistService: WishlistService) { }

    @Get('/user/:id')
    async getWishlistByUserId(@Param('id', ParseIntPipe) id: number): Promise<responseWishlistDto> {

        const response: responseWishlistDto = {
            code: 200,
            success: true,
            data: {
                item: await this.wishlistService.getWishlistByUserId(id)
            },
        };
        return response;
    }

    @Get('/item/:id')
    getWishlistById(@Param('id', ParseIntPipe) id: number): Promise<Wishlist> {
        return this.wishlistService.getWishlistById(id);
    }

    @Post('item/create')
    @UsePipes(ValidationPipe)
    async createWishlist(
        @Body() CreateWishlistDto:CreateWishlistDto,
        @GetUserType() type: string,
        @GetUserId() id: number,
        @GetUserCode() code: string,
    ): Promise<responseWishlistDto> {
        if (type !== 'CHILD') {
            throw new ForbiddenException('Only children can create a wishlist.');
        }

        const response: responseWishlistDto = {
            code: 200,
            success: true,
            data: {
                item: await this.wishlistService.createWishlist(CreateWishlistDto, type, code, id)
            },
        };

        return response

    }

    @Delete('/item/:id')
    deleteWishlist(
        @Param('id', ParseIntPipe) id: number,
        @GetUserType() type: string,
    ): Promise<{ code: number; success: boolean }> {
        if (type !== 'CHILD') {
            throw new ForbiddenException('Only children can delete a wishlist.');
        }
        return this.wishlistService.deleteWishlist(id);
    }

    @Patch('/item/:id/pickstatus')
    async updateWishlistPickStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('pickStatus') pickStatus: PickedStatus,
        @GetUserType() type: string,
    ): Promise<responseWishlistDto> {
        if (type !== 'PARENT') {
            throw new ForbiddenException('Only parents can update a wishlist.');
        }
        const response: responseWishlistDto = {
            code: 200,
            success: true,
            data: {
                item: await this.wishlistService.updateWishlistPickStatus(id, pickStatus)
            },
        };
        return response
    }

    @Patch('/item/:id/givenstatus')
    async updateWishlistGivenStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('givenStatus') givenStatus: GivenStatus,
        @GetUserType() type: string,
    ): Promise <responseWishlistDto> {
        if (type !== 'PARENT') {
            throw new ForbiddenException('Only parents can update a wishlist.');
        }        
        const response: responseWishlistDto = {
            code: 200,
            success: true,
            data: {
              item: await this.wishlistService.updateWishlistGivenStatus(id, givenStatus)
            },
          };

        return response
    }

    @Patch('/item/:id')
    async updateWishlist(
        @Param('id', ParseIntPipe) Wishlistid: number,
        @Body() CreateWishlistDto:CreateWishlistDto,
        @GetUserType() type: string,
        @GetUserId() id: number,
    ): Promise<responseWishlistDto> {
        if (type !== 'CHILD') {
            throw new ForbiddenException('Only children can update a wishlist.');
        }

        const response: responseWishlistDto = {
            code: 200,
            success: true,
            data: {
                item: await this.wishlistService.updateWishlist(Wishlistid, CreateWishlistDto, id)
            },
        };


        return response
    }

}

