import { Module, Logger } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [NewsService, Logger],
  controllers: [NewsController],
})
export class NewsModule {}
