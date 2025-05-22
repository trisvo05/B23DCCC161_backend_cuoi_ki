import { Module } from '@nestjs/common';
// import { SubjectcombinationService } from './subjectcombination.service';
import { SubjectcombinationController } from './subjectcombination.controller';
import { subjectcombinationService } from './subjectcombination.service';
import { SubjectCombination } from './entities/subjectcombination.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SubjectCombination])],
  controllers: [SubjectcombinationController],
  providers: [subjectcombinationService],
})
export class SubjectcombinationModule {}
