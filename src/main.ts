import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const serverConfig = config.get('server');
  const port = serverConfig.get('port');
  await app.listen(port);
}
bootstrap();
