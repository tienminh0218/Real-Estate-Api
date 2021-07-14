import { Module, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoryPropertyController } from './categoryProperty.controller';
import { CategoryPropertyService } from './categoryProperty.service';

@Module({
    imports: [PrismaModule],
    providers: [CategoryPropertyService, PrismaService, Logger],
    controllers: [CategoryPropertyController]
})
export class CompaniesModule { }
