import { Injectable } from '@nestjs/common';
import { CreateSubjectcombinationDto } from './dto/create-subjectcombination.dto';
import { UpdateSubjectcombinationDto } from './dto/update-subjectcombination.dto';

@Injectable()
export class SubjectcombinationsService {
  create(createSubjectcombinationDto: CreateSubjectcombinationDto) {
    return 'This action adds a new subjectcombination';
  }

  findAll() {
    return `This action returns all subjectcombinations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subjectcombination`;
  }

  update(id: number, updateSubjectcombinationDto: UpdateSubjectcombinationDto) {
    return `This action updates a #${id} subjectcombination`;
  }

  remove(id: number) {
    return `This action removes a #${id} subjectcombination`;
  }
}
