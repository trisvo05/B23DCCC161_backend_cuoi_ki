import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'minhtrivo2005gg@gmail.com',
      pass: 'jspf lgjn uqxx vwlm', // Dùng App Password nếu dùng Gmail
    },
  });

  async sendApplicationSubmittedEmail(to: string, fullName: string) {
    const mailOptions = {
      from: '"Hệ thống Xét tuyển" <your-email@gmail.com>',
      to,
      subject: 'Xác nhận nộp hồ sơ xét tuyển thành công',
      html: `
        <p>Chào <b>${fullName}</b>,</p>
        <p>Hệ thống xác nhận bạn đã <b>nộp hồ sơ xét tuyển</b> thành công.</p>
        <p>Chúng tôi sẽ xem xét hồ sơ và gửi kết quả trong thời gian sớm nhất.</p>
        <br/>
        <p>Trân trọng,</p>
        <p><i>Phòng Tuyển sinh</i></p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Đã gửi mail tới ${to}`);
    } catch (error) {
      console.error('Lỗi khi gửi mail :', error);
      throw error;
    }
  }
}
