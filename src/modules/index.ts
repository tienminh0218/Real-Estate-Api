import { BrokerModule } from '././broker/broker.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { NewsModule } from './news/news.module';
import { CommentModule } from './comment/comment.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { PropertyModule } from './property/property.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    UserModule,
    ProjectsModule,
    NewsModule,
    CommentModule,
    AuthModule,
    CompaniesModule,
    PropertyModule,
    BrokerModule,
  ],
})
export class AppModule {}
