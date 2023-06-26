import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BoardRepository } from './board.repository';
import { UserRepository } from 'src/auth/user.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { PushService } from 'src/push/push.service';
import { PushConnectionRepository } from 'src/push/push-connection.repository';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      BoardRepository,
      UserRepository,
      PushConnectionRepository,
    ]),
    AuthModule,
  ],
  controllers: [BoardController],
  providers: [
    BoardService, 
    BoardRepository,
    PushConnectionRepository,
    UserRepository,
    JwtService,
    AuthService,
    JwtStrategy,
    PushService],
  exports: [BoardService, TypeOrmModule]
})
export class BoardModule {}
