import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { NotificationService } from '../notification/notification.service';
import { User } from '../users/entities/user.entity';
import { Major } from '../majors/entities/major.entity';
import { SubjectCombination } from '../subjectcombination/entities/subjectcombination.entity';
import { MajorCombination } from '../majors/entities/major-combination.entity';
// import { SubjectCombination, Subjectcombination } from './entities/subjectcombination.entity';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private readonly Repo: Repository<Application>,
    private readonly notificationService: NotificationService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Major)
    private readonly majorRepo: Repository<Major>,
    @InjectRepository(SubjectCombination)
    private readonly combinationsMajor: Repository<MajorCombination>,
  ) {}
  async create(dto: CreateApplicationDto): Promise<Application> {
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('User not found');

    const major = await this.majorRepo.findOne({
      where: { id: dto.majorId },
      relations: ['combinations'],
    });
    if (!major) throw new NotFoundException('Major not found');

    const combination = await this.combinationsMajor.findOne({
      where: { id: dto.combinationId },
    });
    if (!combination) throw new NotFoundException('Combination not found');

    // const isValid = major.combinations.some(
    //   c => c.combination.id === combination.id,
    // );
    // if (!isValid)
    //   throw new NotFoundException(
    //     'Combination does not belong to selected Major',
    //   );

    try {
      const data = this.Repo.create({
        user,
        major,
        combination,
        personalInfo: dto.personalInfo,
        score: dto.score,
        priorityObject: dto.priorityObject,
      });
      // console.log('Data to be saved:', data);
      const savedData = await this.Repo.save(data);

      await this.notificationService.sendApplicationSubmittedEmail(
        'minhtrivo2005gg@gmail.com',
        'Trí Võ',
      );

      return savedData;
    } catch (error) {
      console.error('Lỗi khi lưu application:', error);
      throw new InternalServerErrorException('Không thể tạo application');
    }
  }

  async findAll(): Promise<Application[]> {
    return this.Repo.find({
      relations: ['user', 'major', 'combination'],
    });
  }

  async findOne(id: number): Promise<Application> {
    const user = await this.Repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Không tìm thấy user với id ${id}`);
    }
    return user;
  }
  async update(
    id: number,
    updateApllicationDto: UpdateApplicationDto,
  ): Promise<Application> {
    await this.findOne(id); // Kiểm tra tồn tại
    await this.Repo.update(id, updateApllicationDto);
    return this.findOne(id); // Trả về bản ghi mới sau update
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.Repo.remove(user);
  }
}
