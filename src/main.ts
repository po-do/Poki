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
}
bootstrap();