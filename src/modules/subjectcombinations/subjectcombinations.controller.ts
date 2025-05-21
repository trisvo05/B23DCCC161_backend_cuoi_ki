import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubjectcombinationsService } from './subjectcombinations.service';
import { CreateSubjectcombinationDto } from './dto/create-subjectcombination.dto';
import { UpdateSubjectcombinationDto } from './dto/update-subjectcombination.dto';

@Controller('subjectcombinations')
export class SubjectcombinationsController {
  constructor(private readonly subjectcombinationsService: SubjectcombinationsService) {}

  @Post()
  create(@Body() createSubjectcombinationDto: CreateSubjectcombinationDto) {
    return this.subjectcombinationsService.create(createSubjectcombinationDto);
  }

  @Get()
  findAll() {
    return this.subjectcombinationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectcombinationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubjectcombinationDto: UpdateSubjectcombinationDto) {
    return this.subjectcombinationsService.update(+id, updateSubjectcombinationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectcombinationsService.remove(+id);
  }
}
