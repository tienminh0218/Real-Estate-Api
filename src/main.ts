import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './modules';
import { PrismaService } from './modules/prisma/prisma.service';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const GLOBAL_PREFIX = process.env.GLOBAL_PREFIX || 'api';

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBAL_PREFIX);

  /// Swagger
  const config = new DocumentBuilder()
    .setTitle('Real Estate Api')
    .setDescription('The Real Estate API Description')
    .addCookieAuth('Auth')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  /// cors
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  /// cookie
  app.use(cookieParser());

  /// prisma
  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  /// pipes
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => {
    Logger.log(`Listening on port: http://localhost:${PORT}/${GLOBAL_PREFIX}`);
    Logger.log(`Swagger Api: http://localhost:${PORT}/swagger`);
  });
}
bootstrap();
