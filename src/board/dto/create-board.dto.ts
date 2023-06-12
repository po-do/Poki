import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
    @IsNotEmpty()
    total_grape: number;
}

