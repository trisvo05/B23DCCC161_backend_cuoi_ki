// src/auth/auth.service.ts
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto, ResetPasswordDto } from './dto/forgot-password.dto';
import { UserRole } from '../common/enums/user-role.enum';
import { UserStatus } from '../common/enums/user-status.enum';
import { EmailUtil } from '../utils/email.util';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // ✅ SỬA LỖI: Validate user cho LocalStrategy
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _password, ...result } = user;
      return result;
    }
    return null;
  }

  // Đăng ký
  async register(registerDto: RegisterDto) {
    const { fullName, username, email, password } = registerDto;

    // Kiểm tra user đã tồn tại
    const existingUser = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });

    if (existingUser) {
      throw new ConflictException('Username hoặc email đã tồn tại');
    }

    // Mã hóa password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user mới
    const user = this.userRepository.create({
      fullName,
      username,
      email,
      password: hashedPassword,
      role: UserRole.STUDENT,
      status: UserStatus.ACTIVE,
    });

    const savedUser = await this.userRepository.save(user);

    // Gửi email chào mừng (không blocking)
    try {
      await EmailUtil.sendWelcomeEmail(email, fullName);
    } catch (error) {
      console.log('Không thể gửi email chào mừng:', error.message);
    }

    // Tạo JWT token
    const payload = {
      sub: savedUser.id,
      username: savedUser.username,
      role: savedUser.role,
    };
    const token = this.jwtService.sign(payload);

    return {
      success: true,
      message: 'Đăng ký thành công',
      user: {
        id: savedUser.id,
        fullName: savedUser.fullName,
        username: savedUser.username,
        email: savedUser.email,
        role: savedUser.role,
        status: savedUser.status,
      },
      token,
    };
  }

  // Đăng nhập
  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Username hoặc password không đúng');
    }

    // Tạo JWT token
    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);

    return {
      success: true,
      message: 'Đăng nhập thành công',
      user: {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      },
      token,
    };
  }

  // Quên mật khẩu
  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Email không tồn tại');
    }

    // Tạo reset token
    const resetToken = this.generateResetToken();
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Lưu token vào database
    await this.userRepository.update(user.id, {
      resetToken,
      resetTokenExpiry,
    });

    // Gửi email
    try {
      const emailSent = await EmailUtil.sendResetPasswordEmail(
        email,
        resetToken,
        user.fullName,
      );

      if (!emailSent) {
        throw new Error('Email service failed');
      }
    } catch (error) {
      console.error('Email error:', error);
      throw new BadRequestException(
        'Không thể gửi email, vui lòng thử lại sau',
      );
    }

    return {
      success: true,
      message: 'Email đặt lại mật khẩu đã được gửi',
    };
  }

  // Đặt lại mật khẩu
  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { token, newPassword } = resetPasswordDto;

    const user = await this.userRepository.findOne({
      where: { resetToken: token },
    });

    if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      throw new BadRequestException('Token không hợp lệ hoặc đã hết hạn');
    }

    // Mã hóa password mới
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Cập nhật password và xóa reset token
    await this.userRepository.update(user.id, {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    });

    return {
      success: true,
      message: 'Đặt lại mật khẩu thành công',
    };
  }

  // Private method tạo reset token
  private generateResetToken(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15) +
      Date.now().toString(36)
    );
  }
}
