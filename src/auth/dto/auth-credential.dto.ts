import { IsNotEmpty, IsEnum, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { UserType } from "../user-type.enum";



export class AuthCredentialsDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    userid: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: 'password only accepts english and number'
    })
    password: string;

    @IsOptional()
    @IsString()
    code?: string;

    @IsEnum(UserType)
    type: string;

}