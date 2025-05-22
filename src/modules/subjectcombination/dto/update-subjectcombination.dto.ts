import { PartialType } from '@nestjs/mapped-types';
import { CreateSubjectcombinationDto } from './create-subjectcombination.dto';

export class UpdateSubjectcombinationDto extends PartialType(
  CreateSubjectcombinationDto,
) {}
