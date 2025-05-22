import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { SchoolsModule } from './modules/schools/schools.module';
import { MajorsModule } from './modules/majors/majors.module';
// import { SubjectcombinationsModule } from './modules/subjectcombinations/subjectcombinations.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { NotificationModule } from './modules/notification/notification.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { ApplicationsModule } from './modules/applications/applications.module';
import { User } from './modules/users/entities/user.entity';
import { School } from './modules/schools/entities/school.entity';
import { Application } from './modules/applications/entities/application.entity';
import { Major } from './modules/majors/entities/major.entity';
import { MajorCombination } from './modules/majors/entities/major-combination.entity';
// import { SubjectCombination } from './modules/subjectcombinations/entities/subjectcombination.entity';
import { Document } from './modules/documents/entities/document.entity';
import { ConfigModule } from '@nestjs/config';
import { SubjectcombinationModule } from './modules/subjectcombination/subjectcombination.module';
import { SubjectCombination } from './modules/subjectcombination/entities/subjectcombination.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Tự động dùng được ở tất cả module
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '',
      port: 3306,
      username: '',
      password: '',
      database: '',
      entities: [
        User,
        School,
        Application,
        Major,
        MajorCombination,
        SubjectCombination,
        Document,
      ],
      synchronize: true,
    }),
    UsersModule,
    SchoolsModule,
    MajorsModule,
    // SubjectcombinationsModule,
    DocumentsModule,
    NotificationModule,
    AdminModule,
    AuthModule,
    ApplicationsModule,
    SubjectcombinationModule,
  ],
})
export class AppModule {}
