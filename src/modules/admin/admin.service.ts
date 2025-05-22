import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Application,
  ApplicationStatus,
} from '../applications/entities/application.entity';
import { Repository } from 'typeorm';
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepo: Repository<Application>,
    // @InjectRepository(User)
    // private readonly userRepo: Repository<User>,
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
    };
  }
}
