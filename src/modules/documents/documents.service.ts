import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { SubjectCombination, Subjectcombination } from './entities/subjectcombination.entity';
import { Document } from './entities/document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly Repo: Repository<Document>,
  ) {}
  async create(createDto: CreateDocumentDto): Promise<Document> {
    const data = this.Repo.create(createDto);
    return this.Repo.save(data);
  }

  async findAll(): Promise<Document[]> {
    return this.Repo.find();
  }

  async findOne(id: number): Promise<Document> {
    const user = await this.Repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Không tìm thấy user với id ${id}`);
    }
    return user;
  }
  async update(id: number, updateDto: UpdateDocumentDto): Promise<Document> {
    await this.findOne(id); // Kiểm tra tồn tại
    await this.Repo.update(id, updateDto);
    return this.findOne(id); // Trả về bản ghi mới sau update
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.Repo.remove(user);
  }
}
