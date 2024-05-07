import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class BingwaServiceType {
  @Prop()
  service_name: string;

  @Prop()
  service_description: string;
}

export const BingwaServiceTypeSchema =
  SchemaFactory.createForClass(BingwaServiceType);
