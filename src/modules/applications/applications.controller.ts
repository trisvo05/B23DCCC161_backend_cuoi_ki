import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  // Put,
  Patch,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
// import { UpdateApplicationDto } from './dto/update-application.dto';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly service: ApplicationsService) {}

  @Post()
  create(@Body() createDto: CreateApplicationDto) {
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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDto: UpdateApplicationDto) {
  //   return this.service.update(+id, updateDto);
  // }

  @Patch(':id')
  updateStatus(@Param('id') id: number, @Body() body: { status: string }) {
    return this.service.updateStatus(id, body.status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
