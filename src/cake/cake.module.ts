import { Module } from '@nestjs/common';
import { CakeService } from './cake.service';
import { CakeController } from './cake.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { cakeSchema } from './entities/cake.schema';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Cake', schema: cakeSchema }]),
    UploadModule,
  ],
  controllers: [CakeController],
  providers: [CakeService],
})
export class CakeModule {}
