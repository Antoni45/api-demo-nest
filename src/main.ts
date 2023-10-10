import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { TokenBlacklistMiddleware } from './security/middleware/token-blacklist.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  // Ajout le middleware de liste noire des tokens à l'application
  // app.use(TokenBlacklistMiddleware);
  await app.listen(3000);
}
bootstrap();
