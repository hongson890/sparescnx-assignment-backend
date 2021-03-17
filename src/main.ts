import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initCoughDatabase } from './db.init';

async function bootstrap() {
  await initCoughDatabase();
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(3000);
}
bootstrap();
