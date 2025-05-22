import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { SubjectCombination, Subjectcombination } from './entities/subjectcombination.entity';
import { CreateSubjectcombinationDto } from './dto/create-subjectcombination.dto';
import { UpdateSubjectcombinationDto } from './dto/update-subjectcombination.dto';
import { SubjectCombination } from './entities/subjectcombination.entity';

@Injectable()
export class subjectcombinationService {
  constructor(
    @InjectRepository(SubjectCombination)
    private readonly Repo: Repository<SubjectCombination>,
  ) {}
  async create(
    createDto: CreateSubjectcombinationDto,
  ): Promise<SubjectCombination> {
    const data = this.Repo.create(createDto);
    return this.Repo.save(data);
  }

  async findAll(): Promise<SubjectCombination[]> {
    return this.Repo.find();
  }

  async findOne(id: number): Promise<SubjectCombination> {
    const user = await this.Repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Không tìm thấy user với id ${id}`);
    }
    return user;
  }
  async update(
    id: number,
    updateSubjectCombinationDto: UpdateSubjectcombinationDto,
  ): Promise<SubjectCombination> {
    await this.findOne(id); // Kiểm tra tồn tại
    await this.Repo.update(id, updateSubjectCombinationDto);
    return this.findOne(id); // Trả về bản ghi mới sau update
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.Repo.remove(user);
  }
}
