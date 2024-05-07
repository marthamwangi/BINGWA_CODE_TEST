import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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
}
export const BingwaProviderSchema =
  SchemaFactory.createForClass(BingwaProvider);