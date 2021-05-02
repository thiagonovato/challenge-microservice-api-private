import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmailService } from '../services/email';
import { AuthRequired } from 'modules/common/guards/token';
import { EmailValidator } from '../validators/email/emailvalidator';

@ApiTags('Email')
@Controller('/')
export class EmailController {
  constructor(private emailService: EmailService) { }

  @Post('/sendEmail')
  @AuthRequired()
  public async sendEmail(@Body() data: EmailValidator) {
    const { subject, recipient, content } = data;
    return this.emailService.sendEmail(subject, recipient, content);
  }
}
