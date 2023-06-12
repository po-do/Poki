import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionController } from './mission.controller';
import { MissionService } from './mission.service';
import { MissionRepository } from './mission.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MissionRepository]),
    AuthModule
  ],
  controllers: [MissionController],
  providers: [MissionService, MissionRepository],
  exports: [MissionService, TypeOrmModule]
})
export class MissionModule {}
