import { IsNotEmpty } from "class-validator";

export class RecommendMissionDto {
    @IsNotEmpty()
    age: string
    
    @IsNotEmpty()
    place: string
    
    @IsNotEmpty()
    ability: string
}