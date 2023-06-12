import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BoardRepository } from './board.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardRepository]),
    AuthModule,
  ],
  controllers: [BoardController],
  providers: [BoardService, BoardRepository],
  exports: [BoardService, TypeOrmModule]
})
export class BoardModule {}
