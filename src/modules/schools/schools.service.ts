import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { School } from './entities/school.entity';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

@Injectable()
export class SchoolsService {
  constructor(
    @InjectRepository(School)
    private readonly Repo: Repository<School>,
  ) {}
  async create(createSchoolDto: CreateSchoolDto): Promise<School> {
    const data = this.Repo.create(createSchoolDto);
    return this.Repo.save(data);
  }

  async findAll(): Promise<School[]> {
    return this.Repo.find();
  }

  async findOne(id: number): Promise<School> {
    const user = await this.Repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Không tìm thấy user với id ${id}`);
    }
    return user;
  }
  async update(id: number, UpdateSchoolDto: UpdateSchoolDto): Promise<School> {
    await this.findOne(id); // Kiểm tra tồn tại
    await this.Repo.update(id, UpdateSchoolDto);
    return this.findOne(id); // Trả về bản ghi mới sau update
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.Repo.remove(user);
  }
}
