import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'ptit-admission-system-jwt-secret-2024', // Hardcode cho học tập
    });
  }

  async validate(payload: any) {
    try {
      const user = await this.authService.validateUser(payload);
      if (!user) {
        throw new UnauthorizedException('Token không hợp lệ');
      }
      return user;
    } catch (error) {
      // Log error hoặc xử lý error cụ thể nếu cần
      console.error('JWT validation error:', error);
      throw new UnauthorizedException('Token không hợp lệ hoặc đã hết hạn');
    }
  }
}
