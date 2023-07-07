import { IsString } from "class-validator";

export class ConnectUserDto {
    @IsString()
    child_id: string;

    @IsString()
    connection_code: string;
}