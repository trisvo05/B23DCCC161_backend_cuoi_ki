import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
// import { ApplicationsController } from './applications.controller';
import { Application } from './entities/application.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationsController } from './applications.controller';
import { NotificationModule } from '../notification/notification.module';
import { User } from '../users/entities/user.entity';
import { Major } from '../majors/entities/major.entity';
import { SubjectCombination } from '../subjectcombination/entities/subjectcombination.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Application, User, Major, SubjectCombination]),
    NotificationModule,
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
})
export class ApplicationsModule {}
