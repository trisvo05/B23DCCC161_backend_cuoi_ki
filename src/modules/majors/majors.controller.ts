import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MajorCombinationService, MajorsService } from './majors.service';
import { CreateMajorDto } from './dto/create-major.dto';
import { UpdateMajorDto } from './dto/update-major.dto';

@Controller('majors')
export class MajorsController {
  constructor(private readonly majorsService: MajorsService) {}

  @Post()
  create(@Body() createMajorDto: CreateMajorDto) {
    return this.majorsService.create(createMajorDto);
  }

  @Get()
  findAll() {
    return this.majorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.majorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMajorDto: UpdateMajorDto) {
    return this.majorsService.update(+id, updateMajorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.majorsService.remove(+id);
  }
}

// major-combination.controller.ts
@Controller('majors-combinations')
export class MajorsCombinationsController {
  constructor(private readonly service: MajorCombinationService) {}

  @Post()
  create(@Body() createMajorDto: CreateMajorDto) {
    return this.service.create(createMajorDto);
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
  update(@Param('id') id: string, @Body() updateMajorDto: UpdateMajorDto) {
    return this.service.update(+id, updateMajorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
