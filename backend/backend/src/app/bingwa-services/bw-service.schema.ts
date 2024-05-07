import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BingwaProvider } from '../bingwa-providers/bw-provider.schema';

@Schema()
export class BingwaService {
  @Prop()
  service_name: string;
  @Prop()
  service_description: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BingwaProvider',
  })
  service_provider_id: BingwaProvider;
  @Prop()
  price: string;
  @Prop({ type: Object })
  location: {
    type: string;
    coordinates: [number, number];
  };
}

export const BingwaServiceSchema = SchemaFactory.createForClass(BingwaService);
