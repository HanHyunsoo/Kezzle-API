import { Module } from '@nestjs/common';
import { CakeModule } from './cake/cake.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModule } from './order/order.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Module({
  imports: [
    CakeModule,
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      user: process.env.MONGODB_USERNAME,
      pass: process.env.MONGODB_PASSWORD,
      dbName: process.env.MONGODB_DBNAME,
    }),
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
