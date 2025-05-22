import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './entities/document.entity';
import { DocumentsController } from './documents.controller';
// import { DocumentsController } from './documents.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Document])], // Add your entities here
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
