import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
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
}
bootstrap();
