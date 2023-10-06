import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: any;

  constructor() {
    // Configuration de transpoeteur SMTP
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      secure: false,
      auth: {
        user: 'nirinaantoni@gmail.com',
        pass: 'ndrema45',
      },
    });
  }

  // Envoi mail
  async sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'nirinaantoni@gmail.com',
      to,
      subject,
      text,
    };

    try {
      return await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw new HttpException('Error sending email!', HttpStatus.BAD_REQUEST);
    }
  }
}
