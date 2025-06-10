import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Admin } from '../admin/entities/admin.entity';
import { User, UserRole } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    try {
      // Tìm trong bảng admin trước
      let user: Admin | User | null = await this.adminRepository.findOne({
        where: { email },
      });
      let userType = 'admin';

      // Nếu không tìm thấy admin, tìm trong bảng user
      if (!user) {
        user = await this.userRepository.findOne({ where: { email } });
        userType = 'user'; // Sẽ dùng để phân quyền
      }

      if (!user) {
        throw new UnauthorizedException('Email hoặc mật khẩu không chính xác');
      }

      // Kiểm tra mật khẩu
      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Email hoặc mật khẩu không chính xác');
      }

      // Tạo JWT token
      const payload = {
        sub: user.id,
        email: user.email,
        role: userType, // 'admin' hoặc 'user'
        fullName: user.fullName,
      };
      const token = this.jwtService.sign(payload);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...userWithoutPassword } = user;

      return {
        success: true,
        message: 'Đăng nhập thành công',
        data: {
          token,
          user: {
            ...userWithoutPassword,
            role: userType,
          },
        },
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Đăng nhập thất bại');
    }
  }

  async registerUser(registerDto: RegisterUserDto) {
    const { email, password, confirmPassword, fullName } = registerDto;

    try {
      // Kiểm tra mật khẩu khớp
      if (password !== confirmPassword) {
        throw new BadRequestException('Mật khẩu xác nhận không khớp');
      }

      // Kiểm tra email đã tồn tại trong cả admin và user
      const existingAdmin = await this.adminRepository.findOne({
        where: { email },
      });
      const existingUser = await this.userRepository.findOne({
        where: { email },
      });

      if (existingAdmin || existingUser) {
        throw new ConflictException('Email đã được sử dụng');
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Tạo user mới với role CANDIDATE
      const user = this.userRepository.create({
        email,
        passwordHash: hashedPassword,
        fullName,
        role: UserRole.CANDIDATE, // Mặc định là thí sinh
      });

      await this.userRepository.save(user);

      return {
        success: true,
        message: 'Đăng ký thành công! Vui lòng đăng nhập để tiếp tục.',
      };
    } catch (error) {
      if (
        error instanceof ConflictException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Đăng ký thất bại, vui lòng thử lại');
    }
  }

  async validateUser(payload: any): Promise<(Admin | User) & { role: string }> {
    let user: Admin | User | null;

    if (payload.role === 'admin') {
      user = await this.adminRepository.findOne({ where: { id: payload.sub } });
    } else {
      user = await this.userRepository.findOne({ where: { id: payload.sub } });
    }

    if (!user) {
      throw new UnauthorizedException('Token không hợp lệ');
    }

    return { ...user, role: payload.role };
  }

  async getUserProfile(user: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userWithoutPassword } = user;
    return {
      success: true,
      message: 'Lấy thông tin thành công',
      data: userWithoutPassword,
    };
  }
}
