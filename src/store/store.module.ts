import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { storeSchema } from './entities/store.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Store', schema: storeSchema }]),
  ],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
