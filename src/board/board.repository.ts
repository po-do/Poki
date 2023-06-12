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
        const { blank } = createBoardDto;

        const board = this.create({
            blank,
            full: 0,
            total_grapes: 0,
            attached_grapes: 0,
            deattached_grapes: 0,
            user: { id, code, type }
        });

        await this.save(board);

        const { id: grapeId, full, total_grapes, attached_grapes, deattached_grapes } = board;

        const grape: BoardDto = {
            id: grapeId,
            blank,
            full,
            total_grapes,
            attached_grapes,
            deattached_grapes,
        };

        return grape;
    }

}