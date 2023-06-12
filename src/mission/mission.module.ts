import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionController } from './mission.controller';
import { MissionService } from './mission.service';
import { MissionRepository } from './mission.repository';
import { BoardRepository } from 'src/board/board.repository';
import { AuthModule } from 'src/auth/auth.module';
import { BoardModule } from 'src/board/board.module';
import { BoardService } from 'src/board/board.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MissionRepository,
      BoardRepository]),
      AuthModule,
      BoardModule
  ],
  controllers: [MissionController],
  providers: [
    MissionService, 
    MissionRepository, 
    BoardRepository,
    BoardService],
})
export class MissionModule {}
