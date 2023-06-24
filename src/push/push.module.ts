import { Module } from '@nestjs/common';
import { PushService } from './push.service';
import { PushController } from './push.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PushConnectionRepository } from './push-connection.repository';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([
      PushConnectionRepository]),
    AuthModule],
  providers: [PushService],
  controllers: [PushController],
  exports: [PushService, TypeOrmModule]
})
export class PushModule {}
