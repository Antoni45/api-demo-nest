import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: any;

  constructor() {
    // Configuration de transpoeteur SMTP
    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io', // Utilisation de serveur SMTP locale pour le test
      port: 2525,
      secure: false,
      auth: {
        user: '35132771e7f74f',
        pass: '1b9399f7989f9e',
      },
    });
  }

  // Envoi mail
  async sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'from@example.com',
      to,
      subject,
      text,
    };

    try {
      const res = await this.transporter.sendMail(mailOptions);
      if (res) return { message: 'Email sent successfully!' };
    } catch (error) {
      throw new HttpException('Error sending email!', HttpStatus.BAD_REQUEST);
    }
  }
}
