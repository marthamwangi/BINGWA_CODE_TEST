import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BingwaProvider } from '../bingwa-providers/bw-provider.schema';
import { BingwaServiceType } from '../bingwa-service-type/bw-service-type.schema';

@Schema()
export class BingwaService {
  @Prop()
  service_title: string;

  @Prop()
  service_description: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BingwaProvider',
  })
  service_provider_id: BingwaProvider;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BingwaServiceType',
  })
  service_type_id: BingwaServiceType;

  @Prop()
  price: string;
}

export const BingwaServiceSchema = SchemaFactory.createForClass(BingwaService);
