import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { subjectcombinationService } from './subjectcombination.service';
import { CreateSubjectcombinationDto } from './dto/create-subjectcombination.dto';
import { UpdateSubjectcombinationDto } from './dto/update-subjectcombination.dto';

@Controller('subjectcombinations')
export class SubjectcombinationController {
  constructor(private readonly service: subjectcombinationService) {}

  @Post()
  create(@Body() createDto: CreateSubjectcombinationDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateSubjectcombinationDto,
  ) {
    return this.service.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
