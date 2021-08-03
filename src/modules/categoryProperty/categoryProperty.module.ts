import { Module, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoryPropertyController } from './categoryProperty.controller';
import { CategoryPropertyService } from './categoryProperty.service';
import { CategoryPropertyResolver } from './categoryProperty.resolver';

@Module({
    imports: [PrismaModule],
    providers: [CategoryPropertyService, PrismaService, Logger, CategoryPropertyResolver],
    controllers: [CategoryPropertyController]
})
export class CatePropertyModule { }
