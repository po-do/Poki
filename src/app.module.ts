import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WishlistModule } from './wishlist/wishlist.module';
import { AuthModule } from './auth/auth.module';
import { MissionModule } from './mission/mission.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { BoardModule } from './board/board.module';
import { EventModule } from './event/event.module';
import { VideoChatModule } from './video-chat/video-chat.module';
import { PushModule } from './push/push.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule, 
    WishlistModule, 
    MissionModule,
    BoardModule,
    EventModule,
    VideoChatModule,
    PushModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

