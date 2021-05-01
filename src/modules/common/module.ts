import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BindUserMiddleware } from './middlewares/bindUser';
import { TokenService } from './services/token';

@Module({
  providers: [TokenService],
  exports: [TokenService]
})
export class CommonModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(BindUserMiddleware).forRoutes('*');
  }
}
