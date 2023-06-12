import { IsBoolean, IsString } from "class-validator";

export class ConnectUserResponseDto {
    @IsBoolean()
    connected: boolean;

    @IsString()
    type: string;
}