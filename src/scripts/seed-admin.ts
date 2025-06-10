import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { Repository } from 'typeorm';
import { Admin } from '../modules/admin/entities/admin.entity';
import * as bcrypt from 'bcrypt';
import { getRepositoryToken } from '@nestjs/typeorm';

async function seedAdmin() {
  console.log('🚀 Bắt đầu tạo admin...');

  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const adminRepository: Repository<Admin> = app.get(
      getRepositoryToken(Admin),
    );

    // Kiểm tra admin đã tồn tại chưa
    const existingAdmin = await adminRepository.findOne({
      where: { email: 'admin.pas@gmail.com' },
    });

    if (existingAdmin) {
      console.log('ℹ️ Admin đã tồn tại!');
      console.log('📧 Email: admin.pas@gmail.com');
      console.log('🔑 Password: admin123');
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Tạo admin mới
    const admin = adminRepository.create({
      email: 'admin.pas@gmail.com',
      passwordHash: hashedPassword,
      fullName: 'Quản trị viên hệ thống',
    });

    await adminRepository.save(admin);

    console.log('✅ Tạo admin thành công!');
    console.log('📧 Email: admin.pas@gmail.com');
    console.log('🔑 Password: admin123');
    console.log('🎯 Có thể đăng nhập ngay!');
  } catch (error) {
    console.error('❌ Lỗi khi tạo admin:', error);
  } finally {
    await app.close();
  }
}

seedAdmin();
