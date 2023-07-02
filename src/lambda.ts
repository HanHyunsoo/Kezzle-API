import { Handler, Context } from 'aws-lambda';
import { Server } from 'http';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { CustomExceptionFilter } from './config/custom-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');

const binaryMimeTypes: string[] = [];

let cachedServer: Server;

async function bootstrapServer(): Promise<Server> {
  if (!cachedServer) {
    const expressApp = express();
    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );

    const stage = process.env.STAGE || 'dev';

    const swaggerConfig = new DocumentBuilder()
      .setTitle('Kezzle API')
      .setDescription('The Kezzle API description')
      .setVersion('1.0')
      .addServer(`/${stage}`)
      .build();

    const document = SwaggerModule.createDocument(nestApp, swaggerConfig);
    SwaggerModule.setup('api-docs', nestApp, document);

    nestApp.useGlobalFilters(new CustomExceptionFilter());
    nestApp.use(eventContext());
    await nestApp.init();
    cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
  }
  return cachedServer;
}

export const handler: Handler = async (event: any, context: Context) => {
  cachedServer = await bootstrapServer();

  if (
    event.body &&
    event.headers['Content-Type'].includes('multipart/form-data') &&
    process.env.NODE_ENV === 'development'
  ) {
    event.body = Buffer.from(event.body, 'binary') as unknown as string;
  }

  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
