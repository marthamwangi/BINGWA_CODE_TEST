import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type BingwaProviderDocument = HydratedDocument<BingwaProvider>;

@Schema()
export class BingwaProvider {
  @Prop()
  fname: string;
  @Prop()
  lname: string;
  @Prop()
  email: string;
  @Prop()
  phone: string;
  @Prop()
  profile: string;
  @Prop({ type: Object })
  location: {
    type: string;
    coordinates: [number, number];
  };
}
export const BingwaProviderSchema =
  SchemaFactory.createForClass(BingwaProvider);
