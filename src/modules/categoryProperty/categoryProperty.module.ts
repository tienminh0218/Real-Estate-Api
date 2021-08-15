import { Module, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoryPropertyController } from './categoryProperty.controller';
import { CategoryPropertyService } from './categoryProperty.service';
import { CategoryPropertyResolver } from './categoryProperty.resolver';
import { CategoryPropertyRepository } from './repositories/categoryProperty.repository';

@Module({
    imports: [PrismaModule],
    providers: [CategoryPropertyService, CategoryPropertyRepository, CategoryPropertyResolver, PrismaService, Logger],
    controllers: [CategoryPropertyController],
    exports: [CategoryPropertyService, CategoryPropertyResolver]
})
export class CatePropertyModule { }
