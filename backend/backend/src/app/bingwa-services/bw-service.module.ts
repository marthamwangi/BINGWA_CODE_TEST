import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BingwaServiceSchema } from './bw-service.schema';
import { BingwaServicesController } from './bw-service.controller';
import { BingwaServicesService } from './bw-service.service';
import { SERVICES_COLLECTION_NAME } from '../constants';
import { BingwaProviderModule } from '../bingwa-providers/bw-provider.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SERVICES_COLLECTION_NAME, schema: BingwaServiceSchema },
    ]),
  ],
  controllers: [BingwaServicesController],
  providers: [BingwaServicesService],
})
export class BingwaServiceModule {}
