import { IsNotEmpty } from "class-validator";

export class RecommendMissionDto {
    @IsNotEmpty()
    age: number
    
    @IsNotEmpty()
    place: string
    
    @IsNotEmpty()
    ability: string
}