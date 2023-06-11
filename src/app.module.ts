import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WishlistModule } from './wishlist/wishlist.module';
import { AuthModule } from './auth/auth.module';
import { MissionModule } from './mission/mission.module';

@Module({
  imports: [
    AuthModule, 
    WishlistModule, MissionModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
