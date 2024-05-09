import { Document } from 'mongoose';

export class CreateServiceDto {
  readonly booking: Array<IBooking>;
  readonly service_title: string;
  readonly service_description: string;
  readonly service_provider_id: string;
  readonly service_type_id: string;
  readonly price: string;
}

export interface IBwService extends Document {
  readonly booking: Array<IBooking>;
  readonly service_title: string;
  readonly service_description: string;
  readonly service_provider_id: string;
  readonly service_type_id: string;
  readonly price: string;
}
export interface IBooking {
  client: string;
  date: Date;
  location: Proximity;
}
interface Proximity {
  long: number;
  lat: number;
}
