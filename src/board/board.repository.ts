import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Board } from './board.entity';
import { BoardDto } from './dto/response-board.dto';

@Injectable()
export class BoardRepository extends Repository<Board> {
    constructor(private dataSource: DataSource) {
        super(Board, dataSource.createEntityManager());
    }

    async createBoard(createBoardDto, type: string, code: string, id: number): Promise<BoardDto> {
        const { total_grape } = createBoardDto;

        const board = this.create({
            total_grape,
            user_whole_grapes: 0,
            attached_grapes: 0,
            user: { id, code, type }
        });

        await this.save(board);

        const { id: grapeId, user_whole_grapes, attached_grapes } = board;

        const grape: BoardDto = {
            id: grapeId,
            total_grape,
            user_whole_grapes,
            attached_grapes
        };

        return grape;
    }

}