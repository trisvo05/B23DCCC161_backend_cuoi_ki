import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Student } from '../students/entities/student.entity';
import { Admin } from '../admin/entities/admin.entity';

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const isProduction = this.configService.get('NODE_ENV') === 'production';

    return {
      type: 'mysql',
      host: this.configService.get<string>('DB_HOST', 'localhost'),
      port: this.configService.get<number>('DB_PORT', 3306),
      username: this.configService.get<string>('DB_USERNAME', 'root'),
      password: this.configService.get<string>('DB_PASSWORD', ''),
      database: this.configService.get<string>(
        'DB_DATABASE',
        'student_admission_system',
      ),

      entities: [User, Student, Admin],

      // Development settings
      synchronize: !isProduction,
      logging: !isProduction ? ['query', 'error', 'warn'] : ['error'],

      // Production optimizations
      cache: isProduction
        ? {
            duration: 30000, // 30 seconds
          }
        : false,

      // Connection pool settings
      extra: {
        connectionLimit: this.configService.get<number>(
          'DB_CONNECTION_LIMIT',
          10,
        ),
        acquireTimeout: this.configService.get<number>(
          'DB_ACQUIRE_TIMEOUT',
          60000,
        ),
        timeout: this.configService.get<number>('DB_TIMEOUT', 60000),
        charset: 'utf8mb4',
      },

      // Timezone
      timezone: '+07:00',

      // SSL for production
      ssl: isProduction ? { rejectUnauthorized: false } : false,

      // Auto load entities
      autoLoadEntities: true,
    };
  }
}
