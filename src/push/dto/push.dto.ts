import { IsNotEmpty, IsString } from "class-validator";

export class PushDto {
    @IsNotEmpty()
    @IsString()
    fcm_token: string
  }
  