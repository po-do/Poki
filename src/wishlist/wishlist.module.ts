import { Module } from '@nestjs/common';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { WishlistRepository } from './wishlist.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([WishlistRepository]),
    AuthModule,
  ],
  controllers: [WishlistController],
  providers: [WishlistService, WishlistRepository],
})
export class WishlistModule {}
