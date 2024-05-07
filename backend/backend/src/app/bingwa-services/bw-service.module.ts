import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BingwaService, BingwaServiceSchema } from './bw-service.schema';
import { BingwaServicesController } from './bw-service.controller';
import { BingwaServicesService } from './bw-service.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BingwaService.name, schema: BingwaServiceSchema },
    ]),
  ],
  controllers: [BingwaServicesController],
  providers: [BingwaServicesService],
})
export class BingwaServiceModule {}
