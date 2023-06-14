import { IsNotEmpty, IsEnum, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { UserType } from "../user-type.enum";



export class AuthSignInDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    user_id: string;

    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: 'password only accepts english and number'
    })
    password: string;

}