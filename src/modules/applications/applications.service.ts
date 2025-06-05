import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { NotificationService } from '../notification/notification.service';
// import { SubjectCombination, Subjectcombination } from './entities/subjectcombination.entity';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private readonly Repo: Repository<Application>,
    private readonly notificationService: NotificationService,
  ) {}
  async create(createDto: CreateApplicationDto): Promise<Application> {
    const data = this.Repo.create(createDto);
    console.log('data', data);
    const savedData = this.Repo.save(data);

    await this.notificationService.sendApplicationSubmittedEmail(
      // Đây là email trùng với email của người login -> gửi mail cho người đó , tìm cách xác thực để biết đây là ai
      'minhtrivo2005gg@gmail.com',
      // Tên người trùng với tên của người login , xem chi tiết ở phần service notificationnotification
      'Trí Võ',
    );
    return savedData;
  }

  async findAll(): Promise<Application[]> {
    return this.Repo.find({
      // relations: ['user', 'major', 'combination'],
      relations: ['user'],
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
