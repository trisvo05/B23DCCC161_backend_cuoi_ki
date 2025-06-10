import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Xác nhận mật khẩu không được để trống' })
  confirmPassword: string;

  @IsString()
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  fullName: string;
}
