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
import { CatePropertyModule } from './categoryProperty/categoryProperty.module';
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
<<<<<<< HEAD
    BrokerModule,
=======
    CatePropertyModule
>>>>>>> 151f63b6a8bde5f10e7c6dae6173e49aaa7a62d0
  ],
})
export class AppModule { }
