import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

const appConfig = {
  globalPrefix: 'api',
  port: 3000,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(appConfig.globalPrefix);
  await app.listen(appConfig.port);
}
bootstrap();
