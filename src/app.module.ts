import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { OwnerModule } from './owner/owner.module';
import { ProjectModule } from './project/project.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), PrismaModule, OwnerModule, ProjectModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
