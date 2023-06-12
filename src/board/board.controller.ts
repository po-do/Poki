import { Body, Controller, Get, Param, Post, Delete, Patch, ValidationPipe, UsePipes, ParseIntPipe, UseGuards, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { GetUserType } from 'src/decorators/get-user.type.decorator';
import { GetUserId } from 'src/decorators/get-user.userid.decorator';
import { GetUserCode } from 'src/decorators/get-user.code.decorator';
import { responseBoardDto } from './dto/response-board.dto';

@Controller('board')
@UseGuards(AuthGuard())
export class BoardController {
    constructor(private boardService: BoardService) { }

    @Post('/grape/create')
    @UsePipes(ValidationPipe)
    async createBoard(
        @Body() CreateBoardDto: CreateBoardDto,
        @GetUserType() type: string,
        @GetUserId() id: number,
        @GetUserCode() code: string,
    ): Promise <responseBoardDto> {
        console.log(type);
        if (type !== 'PARENT') {
            throw new ForbiddenException('only parent can create board');
        }

        const response: responseBoardDto = {
            code: 200,
            success: true,
            data: {
                grape: await this.boardService.createBoard(CreateBoardDto, type, code, id)
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

    @Get('/user/:id')
    async getBoardByUserId(@Param('id', ParseIntPipe) id: number): Promise<responseBoardDto> {
            
            const response: responseBoardDto = {
                code: 200,
                success: true,
                data: {
                    grape: await this.boardService.getBoardByUserId(id)
                },
            };
            return response;
        }

    // 처음에 지정한 수 변경
    @Patch('/grape/:id')
    async updateBoard(
        @Param('id', ParseIntPipe) grapeid: number,
        @Body() CreateBoardDto: CreateBoardDto,
        @GetUserType() type: string,
        @GetUserId() id: number,
    ): Promise<responseBoardDto> {
        if (type !== 'PARENT') {
            throw new ForbiddenException('only parent can update board');
        }

        const response: responseBoardDto = {
            code: 200,
            success: true,
            data: {
                grape: await this.boardService.updateBoard(grapeid, CreateBoardDto, id)
            },
        };

        return response
    }


    /* 포도에 포도알 붙히면 미션 status 변경, 포도에 포도를 붙힐시에 미션을 삭제, 
    board안의 포도에 붙어있는 포도알수 + 1*/

}
