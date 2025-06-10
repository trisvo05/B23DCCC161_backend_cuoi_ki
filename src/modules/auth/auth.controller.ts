import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { Roles } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register-user')
  async registerUser(@Body() registerDto: RegisterUserDto) {
    return this.authService.registerUser(registerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@CurrentUser() user: any) {
    return this.authService.getUserProfile(user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('admin-dashboard')
  async getAdminDashboard(@CurrentUser() user: any) {
    return {
      success: true,
      message: 'Chào mừng bạn đến với trang quản trị!',
      data: {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
        },
        stats: {
          totalUsers: 0, // Sẽ implement sau
          totalApplications: 0,
          pendingApplications: 0,
        },
      },
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @Get('user-dashboard')
  async getUserDashboard(@CurrentUser() user: any) {
    return {
      success: true,
      message: 'Chào mừng thí sinh!',
      data: {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
        },
        profile: {
          completed: false, // Sẽ check sau khi có user_profiles
        },
        applications: [], // Sẽ implement sau
      },
    };
  }
}
