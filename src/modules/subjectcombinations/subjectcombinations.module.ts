import { Module } from '@nestjs/common';
import { SubjectcombinationsService } from './subjectcombinations.service';
import { SubjectcombinationsController } from './subjectcombinations.controller';

@Module({
  controllers: [SubjectcombinationsController],
  providers: [SubjectcombinationsService],
})
export class SubjectcombinationsModule {}
