import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Major } from './entities/major.entity';
import { CreateMajorDto } from './dto/create-major.dto';
import { UpdateMajorDto } from './dto/update-major.dto';
import { MajorCombination } from './entities/major-combination.entity';
// import { SubjectCombination, Subjectcombination } from './entities/subjectcombination.entity';

@Injectable()
export class MajorsService {
  constructor(
    @InjectRepository(Major)
    private readonly Repo: Repository<Major>,
  ) {}
  async create(createDto: CreateMajorDto): Promise<Major> {
    const data = this.Repo.create(createDto);
    return this.Repo.save(data);
  }

  async findAll(): Promise<Major[]> {
    return this.Repo.find();
  }

  async findOne(id: number): Promise<Major> {
    const user = await this.Repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Không tìm thấy user với id ${id}`);
    }
    return user;
  }
  async update(id: number, updateDto: UpdateMajorDto): Promise<Major> {
    await this.findOne(id); // Kiểm tra tồn tại
    await this.Repo.update(id, updateDto);
    return this.findOne(id); // Trả về bản ghi mới sau update
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.Repo.remove(user);
  }
}

// Các tổ hợp môn trong một ngành
@Injectable()
export class MajorCombinationService {
  constructor(
    @InjectRepository(MajorCombination)
    private readonly Repo: Repository<MajorCombination>,
  ) {}
  async create(createDto: CreateMajorDto): Promise<MajorCombination> {
    const data = this.Repo.create(createDto);
    return this.Repo.save(data);
  }

  async findAll(): Promise<MajorCombination[]> {
    return this.Repo.find({
      relations: ['major', 'combination'], // Lấy thông tin major và combination liên quan
    });
  }

  async findOne(id: number): Promise<MajorCombination> {
    const user = await this.Repo.findOne({
      where: { major: { id } },
      relations: ['major', 'combination'],
    });
    if (!user) {
      throw new NotFoundException(`Không tìm thấy user với id ${id}`);
    }
    return user;
  }
  async update(
    id: number,
    updateDto: UpdateMajorDto,
  ): Promise<MajorCombination> {
    await this.findOne(id); // Kiểm tra tồn tại
    await this.Repo.update(id, updateDto);
    return this.findOne(id); // Trả về bản ghi mới sau update
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.Repo.remove(user);
  }
}
