import { Body, Controller, Get, Param, Post, Delete, Patch, ValidationPipe, UsePipes, ParseIntPipe, UseGuards, ForbiddenException, Sse } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { Wishlist } from './wishlist.entity';
import { GetUserType } from 'src/decorators/get-user.type.decorator';
import { GetUser } from 'src/decorators/get-user.decorator';
import { GetUserId } from 'src/decorators/get-user.userid.decorator';
import { GetUserCode } from 'src/decorators/get-user.code.decorator';
import { responseWishlistDto, responseWishlistGivenDto } from './dto/response-wishlist.dto';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/user.entity';
import { BoardService } from 'src/board/board.service';
import * as config from 'config';
import axios from 'axios';
import { PushService } from 'src/push/push.service';


const openAPIConfig = config.get('openAPI');

@Controller('wishlist')
@UseGuards(AuthGuard())

export class WishlistController {
    constructor(
        private wishlistService: WishlistService,
        private AuthService: AuthService,
        private boardService: BoardService,
        private pushService: PushService) { }

    @Get('/user')
    async getWishlistByUserId(
        @GetUser() user: User,
        @GetUserId() id: number,
        @GetUserType() type: string
    ): Promise<responseWishlistGivenDto> {
        
        if (type !== 'CHILD') {
            id = await this.AuthService.getConnectedUser(user);
        }
        
        const response: responseWishlistGivenDto = {
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
        @GetUser() user: User,
        // @GetUserPushToken() pushToken: string,
    ): Promise<responseWishlistDto> {

        // // const pushToken = await this.AuthService.getConnectedUserPuhsToken(user);
        
        // // const ConnectPushToken = pushToken[0].fcm_token;
        const connect_id = await this.AuthService.getConnectedUser(user);

        
        
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
        
        try {
            const pushToken = await this.pushService.getPushToeknByUserId(connect_id);
            
            if (response.success === true){
                const title = '위시리스트가 등록되었습니다!';
                const info = `위시리스트: ${response.data.item.ProductName}`;
                await this.pushService.push_noti(pushToken, title, info);
            }
            return response
        } catch (exception) {
            if (exception instanceof ForbiddenException) {
               return response
            }
        }
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
        @GetUserType() type: string,
    ): Promise<responseWishlistDto> {
        if (type !== 'PARENT') {
            throw new ForbiddenException('Only parents can update a wishlist.');
        }
        const response: responseWishlistDto = {
            code: 200,
            success: true,
            data: {
                item: await this.wishlistService.updateWishlistPickStatus(id)
            },
        };
        return response
    }

    @Post('/item/:id/givenstatus')
    async updateWishlistGivenStatus(
        @Param('id', ParseIntPipe) id: number,
    ): Promise <responseWishlistGivenDto> {

        const response: responseWishlistGivenDto = {
            code: 200,
            success: true,
            data: {
              item: await this.wishlistService.updateWishlistGivenStatus(id),
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


    @Post('/shopping-list')
    async getShoppingList(@Body('query') query: string): Promise<any> {
        const api_url = 'https://openapi.naver.com/v1/search/shop?query=' + encodeURI(query); // JSON 결과

        const options = {
            headers: { 'X-Naver-Client-Id': openAPIConfig.id, 'X-Naver-Client-Secret': openAPIConfig.key }, // config 오류때문에 일단 이렇게 처리 차후 수정
        };

        try {
            const response = await axios.get(api_url, options);
            return response.data;
        } catch (error) {
            console.log('error = ' + error.response.status);
            throw new Error('Failed to fetch shopping list');
        }
    }

}

