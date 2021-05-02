import { Injectable } from '@nestjs/common';
import { MailgunService, EmailOptions } from '@nextnm/nestjs-mailgun';

@Injectable()
export class EmailService {
  constructor(private mailgunService: MailgunService) { }

  public async sendEmail(subject: string, recipient: [string], content: string) {
    const arrOk: any = [];
    const arrError: any = [];

    for (const item of recipient) {
      try {
        const options: EmailOptions = {
          from: `Email teste <${process.env.MAIL_FROM}>`,
          to: item,
          subject,
          html: content
        };

        await this.mailgunService.sendEmail(options);
        arrOk.push(item);
      } catch (error) {
        arrError.push(item);
      }
    }

    return { arrOk, arrError };
  }
}
