import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BingwaServiceTypeSchema } from './bw-service-type.schema';
import { BingwaServiceTypeController } from './bw-service-type.controller';
import { BingwaServiceTypeService } from './bw-service-type.service';
import { TYPES_COLLECTION_NAME } from '../constants';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TYPES_COLLECTION_NAME,
        schema: BingwaServiceTypeSchema,
      },
    ]),
  ],
  controllers: [BingwaServiceTypeController],
  providers: [BingwaServiceTypeService],
})
export class BingwaServiceTypeModule {}
