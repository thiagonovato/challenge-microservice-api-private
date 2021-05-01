import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommonModule } from 'modules/common/module';
import { AuthController } from './controllers/auth';
import { RenewTokenMiddleware } from './middlewares/renewToken';
import { AuthService } from './services/auth';

@Module({
  imports: [CommonModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(RenewTokenMiddleware).forRoutes('*');
  }
}
