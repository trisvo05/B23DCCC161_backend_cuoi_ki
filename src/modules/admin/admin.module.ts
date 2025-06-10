import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Application } from '../applications/entities/application.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Major } from '../majors/entities/major.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Application, Major])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
