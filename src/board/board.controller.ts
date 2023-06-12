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

}
