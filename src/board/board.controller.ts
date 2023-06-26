import { Body, Controller, Get, Param, Post, Delete, Patch, ValidationPipe, UsePipes, ParseIntPipe, UseGuards, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { GetUserType } from 'src/decorators/get-user.type.decorator';
import { GetUserId } from 'src/decorators/get-user.userid.decorator';
import { GetUserCode } from 'src/decorators/get-user.code.decorator';
import { responseBoardDto } from './dto/response-board.dto';
import { AuthService } from 'src/auth/auth.service';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { GetUserPushToken } from 'src/decorators/get-user.pushtoken.decorator';
import { PushService } from 'src/push/push.service';

@Controller('board')
@UseGuards(AuthGuard())
export class BoardController {
    constructor(
        private boardService: BoardService,
        private AuthService: AuthService,
        private pushService: PushService
        ) { }

    @Post('grape/create')
    @UsePipes(ValidationPipe)
    async createBoard(
        @GetUserType() type: string,
        @GetUserId() id: number,
        @GetUserCode() code: string,
    ): Promise <responseBoardDto> {
       
        if (type !== 'PARENT') {
            throw new ForbiddenException('only parent can create board');
        }
        const grape = await this.boardService.getBoardByUserId(id);


        if (grape) {
            throw new ForbiddenException('parents already have grape');
        }

        const response: responseBoardDto = {
            code: 200,
            success: true,
            data: {
                grape: await this.boardService.createBoard(type, code, id)
            },
        };

        return response

    }

    @Delete('/grape/:id')
    deleteBoard(
        @Param('id', ParseIntPipe) id: number,
        @GetUserType() type: string,
    ): Promise<{ code: number; success: boolean }> {
        return this.boardService.deleteBoard(id);
    }

    @Get('/grape/:id')
    getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
        return this.boardService.getBoardById(id);
    }

    @Post('/grape/user')
    async getBoardByUserId(
        @GetUser() user: User,
        @GetUserId() id: number,
        @GetUserType() type: string): Promise<responseBoardDto> {
           

            if (type !== 'PARENT') {
                id = await this.AuthService.getConnectedUser(user);
            }

            const grape = await this.boardService.getBoardByUserId(id);
         
    
            if (!grape) {
                const response: responseBoardDto = {
                    code: 200,
                    success: true,
                    data: {
                        grape: {
                            id:0,
                            blank: 0,
                            total_grapes: 0,
                            attached_grapes: 0,
                            deattached_grapes: 0,
                        }
                    },
                    is_existence: false,
                };
                return response;
            }

            const response: responseBoardDto = {
                code: 200,
                success: true,
                data: {
                    grape: await this.boardService.getBoardByUserId(id)
                },
                is_existence: true,
            };
            return response;
        }

    // 처음에 지정한 수 변경
    @Post('/grape')
    async updateBoard(
        @Body() CreateBoardDto: CreateBoardDto,
        @GetUserType() type: string,
        @GetUserId() id: number,
        @GetUserPushToken() pushToken: string
    ): Promise<responseBoardDto> {
        if (type !== 'PARENT') {
            throw new ForbiddenException('only parent can update board');
        }
        const grape = await this.boardService.getBoardByUserId(id);
      

        if (!grape) {
            throw new ForbiddenException('parents not have grape');
        }

        const response: responseBoardDto = {
            code: 200,
            success: true,
            data: {
                grape: await this.boardService.updateBoard(grape.id, CreateBoardDto, id)
            },
        };

        const title = '포도알이 발급되었어요! 지금 확인해보세요.';
        const info = {
            result: 'success'
        }
        await this.pushService.push_noti(pushToken, title, info);
        return response
    }

    //포도 부착 버튼 클릭시 실행 함수
    @Post('/grape/attach')
    async attachBoard(
        @GetUser() user: User,
        @GetUserType() type: string,
        @GetUserCode() code: string,
    ): Promise<responseBoardDto> {
        if (type !== 'CHILD') {
            throw new ForbiddenException('only child can attach board');
        }


        const id = await this.AuthService.getConnectedUser(user);
        
        const grape = await this.boardService.getBoardByUserId(id);
        

        if (!grape) {
            throw new ForbiddenException('parents not have grape');
        }
        

        const response: responseBoardDto = {
            code: 200,
            success: true,
            data: {
                grape: await this.boardService.attachBoard(grape.id, code)
            },
        };

        return response
    }

}
