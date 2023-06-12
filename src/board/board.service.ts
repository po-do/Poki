import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { BoardDto } from './dto/response-board.dto';


@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ) { }

    createBoard(createBoardDto, type:string, code:string, id:number): Promise<BoardDto> {
        return this.boardRepository.createBoard(createBoardDto, type, code, id);
    }

}
