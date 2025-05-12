import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const CLIENT_URL = 'http://localhost:3000';

const SERVER_PORT = 8000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  });

  await app.listen(SERVER_PORT);
}

bootstrap();
