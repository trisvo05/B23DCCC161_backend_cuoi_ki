import { Module } from '@nestjs/common';
import { MajorCombinationService, MajorsService } from './majors.service';
import {
  MajorsCombinationsController,
  MajorsController,
} from './majors.controller';
import { Major } from './entities/major.entity';
import { MajorCombination } from './entities/major-combination.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Major, MajorCombination])],
  controllers: [MajorsController, MajorsCombinationsController],
  providers: [MajorsService, MajorCombinationService],
})
export class MajorsModule {}
