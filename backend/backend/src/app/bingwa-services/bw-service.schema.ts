import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BingwaServiceType } from '../bingwa-service-type/bw-service-type.schema';
import { BingwaProvider } from '../bingwa-providers/bw-provider.schema';
import { PROVIDERS_COLLECTION_NAME, TYPES_COLLECTION_NAME } from '../constants';
import { IBooking } from './dto/create-service-dto';

@Schema()
export class BingwaService {
  @Prop()
  service_title: string;

  @Prop()
  service_description: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: PROVIDERS_COLLECTION_NAME,
  })
  service_provider_id: BingwaProvider;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: TYPES_COLLECTION_NAME,
  })
  service_type_id: BingwaServiceType;

  @Prop()
  price: string;

  @Prop({ type: Array<IBooking> })
  booking: Array<IBooking>;
}

export const BingwaServiceSchema = SchemaFactory.createForClass(BingwaService);
