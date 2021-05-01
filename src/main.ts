import './global';

import { BaseExceptionFilter, HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(ApplicationModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: false, forbidUnknownValues: true }));
  app.useGlobalFilters(new BaseExceptionFilter(httpAdapter));

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Challenge Microservice API')
    .setDescription('by Thiago Novato (github.com/thiagonovato)')
    .setVersion(`1.${process.env.VERSION}`)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(3000, '0.0.0.0', () => {
    console.log('******************************');
    console.log(`SERVER STARTED as ${process.env.NODE_ENV}`);
    console.log('******************************');
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error(reason);
    console.log(promise);
  });

  process.on('uncaughtException', err => {
    console.error(err);
  });

  process.on('SIGTERM', async () => {
    await app.close();
    process.exit(0);
  });
}
bootstrap().catch(err => console.error(err));
