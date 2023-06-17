import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(
    {
    origin: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,});

  const serverConfig = config.get('server');
  const port = process.env.SERVER_PORT || serverConfig.get('port');
  await app.listen(port);


    // 로깅 레벨 설정
    Logger.log('This is a log message'); // 일반 로그
    Logger.debug('This is a debug message'); // 디버그 로그
    Logger.verbose('This is a verbose message'); // 상세 로그
    Logger.warn('This is a warning message'); // 경고 로그
    Logger.error('This is an error message'); // 에러 로그
}
bootstrap();