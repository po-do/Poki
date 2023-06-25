import { IsOptional, IsString } from "class-validator";

export class PushDto {
    @IsOptional()
    @IsString()
    fcm_token?: string;
  }
  