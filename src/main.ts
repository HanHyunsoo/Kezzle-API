import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as AWS from 'aws-sdk';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

AWS.config.update({
  region: process.env.A_REGION,
  accessKeyId: process.env.A_ACCESS_KEY_ID,
  secretAccessKey: process.env.A_SECRET_ACCESS_KEY,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Kezzle API')
    .setDescription('The Kezzle API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
