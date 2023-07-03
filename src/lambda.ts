import { Handler, Context } from 'aws-lambda';
import { Server } from 'http';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as AWS from 'aws-sdk';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');

AWS.config.update({
  region: process.env.A_REGION,
  accessKeyId: process.env.A_ACCESS_KEY_ID,
  secretAccessKey: process.env.A_SECRET_ACCESS_KEY,
});

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

    nestApp.use(eventContext());
    await nestApp.init();
    cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
  }
  return cachedServer;
}

export const handler: Handler = async (event: any, context: Context) => {
  cachedServer = await bootstrapServer();

  if (
    process.env.NODE_ENV === 'development' &&
    event.body &&
    event.headers['Content-Type'].includes('multipart/form-data')
  ) {
    event.body = Buffer.from(event.body, 'binary') as unknown as string;
  }

  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
