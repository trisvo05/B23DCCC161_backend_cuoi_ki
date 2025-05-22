import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
// import { ApplicationsController } from './applications.controller';
import { Application } from './entities/application.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationsController } from './applications.controller';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [TypeOrmModule.forFeature([Application]), NotificationModule],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
})
export class ApplicationsModule {}
