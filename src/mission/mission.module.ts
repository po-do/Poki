import { Module } from '@nestjs/common';
import { MissionController } from './mission.controller';
import { MissionService } from './mission.service';

@Module({
  controllers: [MissionController],
  providers: [MissionService]
})
export class MissionModule {}
