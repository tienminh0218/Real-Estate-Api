import { Module, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoryPropertyService } from './categoryProperty.service';
import { CategoryPropertyController } from './categoryProperty.controller';

@Module({
    imports: [PrismaModule],
    providers: [CategoryPropertyService, PrismaService, Logger],
    controllers: [CategoryPropertyController]
})
export class CategoryPropertyModule { }
