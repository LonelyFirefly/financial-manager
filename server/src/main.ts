import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost';
const PORT = process.env.PORT || 8000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.enableCors({
    origin: CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  });

  await app.listen(PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Running in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`CORS enabled for origin: ${CLIENT_URL}`);
}

bootstrap();
