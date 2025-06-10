// src/utils/email.util.ts
import * as nodemailer from 'nodemailer';

export class EmailUtil {
  private static transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER || 'your-email@gmail.com',
      pass: process.env.EMAIL_PASS || 'your-app-password',
    },
  });

  static async sendResetPasswordEmail(
    email: string,
    resetToken: string,
    userName: string,
  ): Promise<boolean> {
    try {
      const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:8000'}/reset-password?token=${resetToken}`;

      const mailOptions = {
        from: process.env.EMAIL_USER || 'noreply@studentadmission.com',
        to: email,
        subject: 'Đặt lại mật khẩu - Hệ thống tuyển sinh',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Đặt lại mật khẩu</h2>
            <p>Xin chào <strong>${userName}</strong>,</p>
            <p>Bạn đã yêu cầu đặt lại mật khẩu. Vui lòng click vào link bên dưới:</p>
            <a href="${resetUrl}" 
               style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px;">
              Đặt lại mật khẩu
            </a>
            <p><strong>Lưu ý:</strong> Link này sẽ hết hạn sau 1 giờ.</p>
            <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
          </div>
        `,
      };

      await this.transporter.sendMail(mailOptions);
      console.log(`✅ Reset password email sent to: ${email}`);
      return true;
    } catch (error) {
      console.error(`❌ Failed to send email to ${email}:`, error.message);
      return false;
    }
  }

  static async sendWelcomeEmail(
    email: string,
    userName: string,
  ): Promise<boolean> {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER || 'noreply@studentadmission.com',
        to: email,
        subject: 'Chào mừng đến với Hệ thống tuyển sinh!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Chào mừng bạn!</h2>
            <p>Xin chào <strong>${userName}</strong>,</p>
            <p>Cảm ơn bạn đã đăng ký tài khoản tại Hệ thống tuyển sinh.</p>
            <p>Tài khoản của bạn đã được tạo thành công và bạn có thể bắt đầu sử dụng hệ thống.</p>
            <p>Chúc bạn thành công!</p>
          </div>
        `,
      };

      await this.transporter.sendMail(mailOptions);
      console.log(`✅ Welcome email sent to: ${email}`);
      return true;
    } catch (error) {
      console.error(
        `❌ Failed to send welcome email to ${email}:`,
        error.message,
      );
      return false;
    }
  }
}
