import { IsString } from "class-validator";

export class UpdateMissionDto {
    @IsString()
    content: string

    @IsString()
    created_date: string // 추후 수정 예정, Date type
}