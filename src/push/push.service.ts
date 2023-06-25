import { Injectable } from "@nestjs/common";
import { PushConnectionRepository } from "./push-connection.repository";
import { PushDto } from "./dto/push.dto";
import { PushConnection } from "./push.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class PushService {
  constructor(
    @InjectRepository(PushConnectionRepository)
    private pushConnectionRepository: PushConnectionRepository
    ) {}

  async savePushToken(user_id: number, pushDto: PushDto): Promise <void> {
    await this.pushConnectionRepository.savePushToken(user_id, pushDto);
  }
}