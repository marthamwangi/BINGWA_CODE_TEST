import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BingwaServiceType,
  BingwaServiceTypeSchema,
} from './bw-service-type.schema';
import { BingwaServiceTypeController } from './bw-service-type.controller';
import { BingwaServiceTypeService } from './bw-service-type.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BingwaServiceType.name,
        schema: BingwaServiceTypeSchema,
      },
    ]),
  ],
  controllers: [BingwaServiceTypeController],
  providers: [BingwaServiceTypeService],
})
export class BingwaServiceTypeModule {}
