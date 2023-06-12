import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
    @IsNotEmpty()
    total_blanck: number;
}

