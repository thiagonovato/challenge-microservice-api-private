import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MailgunModule } from '@nextnm/nestjs-mailgun';
import { CommonModule } from 'modules/common/module';
import { AuthController } from './controllers/auth';
import { EmailController } from './controllers/email';
import { RenewTokenMiddleware } from './middlewares/renewToken';
import { AuthService } from './services/auth';
import { EmailService } from './services/email';

@Module({
  imports: [
    CommonModule,
    MailgunModule.forRoot({
      DOMAIN: process.env.MAIL_MAILGUN_DOMAIN,
      API_KEY: process.env.MAIL_MAILGUN_APIKEY,
      PUBLIC_API_KEY: process.env.MAIL_MAILGUN_PUBLIC_KEY
    })
  ],
  controllers: [AuthController, EmailController],
  providers: [AuthService, EmailService]
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(RenewTokenMiddleware).forRoutes('*');
  }
}
