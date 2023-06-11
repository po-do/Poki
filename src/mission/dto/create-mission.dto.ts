import { IsNotEmpty } from "class-validator";
import { MissionStatus } from "../mission-status.enum";


export class CreateMissionDto {
    @IsNotEmpty()
    content: string

    @IsNotEmpty()
    created_date: string // 추후 수정 예정, Date type

    @IsNotEmpty()
    completed_date: string // 추후 수정 예정, Date type
}