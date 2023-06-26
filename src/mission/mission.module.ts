import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionController } from './mission.controller';
import { MissionService } from './mission.service';
import { MissionRepository } from './mission.repository';
import { BoardRepository } from 'src/board/board.repository';
import { AuthModule } from 'src/auth/auth.module';
import { BoardModule } from 'src/board/board.module';
import { BoardService } from 'src/board/board.service';
import { UserRepository } from 'src/auth/user.repository';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { PushService } from 'src/push/push.service';
import { PushConnectionRepository } from 'src/push/push-connection.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MissionRepository,
      BoardRepository,
      UserRepository,
      PushConnectionRepository,]),
      AuthModule,
      BoardModule
  ],
  controllers: [MissionController],
  providers: [
    MissionService, 
    MissionRepository,
    PushConnectionRepository, 
    BoardRepository,
    BoardService,
    UserRepository,
    AuthService,
    JwtStrategy,
    JwtService,
    PushService],
  exports: [MissionService, TypeOrmModule]
})
export class MissionModule {}
