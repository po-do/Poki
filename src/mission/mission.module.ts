import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionController } from './mission.controller';
import { MissionService } from './mission.service';
import { MissionRepository } from './mission.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([MissionRepository]),
  ],
  controllers: [MissionController],
  providers: [MissionService, MissionRepository]
})
export class MissionModule {}
