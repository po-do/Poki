import { Module } from '@nestjs/common';
import { PushService } from './push.service';
import { PushController } from './push.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PushConnectionRepository } from './push-connection.repository';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserRepository } from 'src/auth/user.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([
      PushConnectionRepository,
    UserRepository]),
    AuthModule],
  providers: [PushService, AuthService, UserRepository, JwtService],
  controllers: [PushController],
  exports: [PushService, TypeOrmModule]
})
export class PushModule {}
