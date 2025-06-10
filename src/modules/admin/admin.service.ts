import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Application,
  ApplicationStatus,
} from '../applications/entities/application.entity';
import { Repository } from 'typeorm';
import { Major } from '../majors/entities/major.entity';
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepo: Repository<Application>,
    @InjectRepository(Major)
    private readonly majorRepo: Repository<Major>,
  ) {}

  // LẤY THỐNG KÊ ( đếm số lượng hồ sơ )
  // test case xong thì thấy dùng async await hiện tại thì chưa hợp lí
  async getStats() {
    return {
      // đếm số lượng hồ sơ
      totalApplications: await this.applicationRepo.count(),

      //  Đếm hồ sơ theo từng trạng thái
      pending: await this.applicationRepo.count({
        where: { status: ApplicationStatus.PENDING },
      }),
      approved: await this.applicationRepo.count({
        where: { status: ApplicationStatus.APPROVED },
      }),
      rejected: await this.applicationRepo.count({
        where: { status: ApplicationStatus.REJECTED },
      }),

      // count total majors
      majorStats: await this.majorRepo.count(),

      // count applications by school
      // applicationsBySchool: await this.applicationRepo
      //   .createQueryBuilder('application')
      //   .select('application.school', 'school')
      //   .addSelect('COUNT(application.id)', 'count')
      //   .groupBy('application.school')
      //   .getRawMany(),
      // count applications by status
    };
  }
}
