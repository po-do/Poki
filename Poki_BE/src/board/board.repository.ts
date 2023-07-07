import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Board } from './board.entity';
import { BoardDto } from './dto/response-board.dto';

@Injectable()
export class BoardRepository extends Repository<Board> {
    constructor(private dataSource: DataSource) {
        super(Board, dataSource.createEntityManager());
    }

    async createBoard(type: string, code: string, id: number): Promise<BoardDto> {
       

        const board = this.create({
            blank:31,
            total_grapes: 0,
            attached_grapes: 0,
            deattached_grapes: 0,
            user: { id, code, type }
        });

        await this.save(board);

        const { id: grapeId, blank, total_grapes, attached_grapes, deattached_grapes } = board;

        const grape: BoardDto = {
            id: grapeId,
            blank,
            total_grapes,
            attached_grapes,
            deattached_grapes, 
        };

        return grape;
    }

}