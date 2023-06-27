import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { DynamooseConfigService } from './config/dynamoose-config.service';
// import { CakeModule } from './cake/cake.module';

@Module({
  imports: [
    DynamooseModule.forRootAsync({
      useClass: DynamooseConfigService,
    }),
    // CakeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
