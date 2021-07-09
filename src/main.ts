import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules';
import { PrismaService } from './modules/prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const GLOBAL_PREFIX = process.env.GLOBAL_PREFIX;

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.enableCors();

  /// prisma
  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  /// pipes
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => {
    Logger.log(`Listening on port: http://localhost/${PORT}/${GLOBAL_PREFIX}`);
  });
}
bootstrap();
