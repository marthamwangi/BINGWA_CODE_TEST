import { ILocation } from '../bw-service/data.model';

export interface IBooking {
  client: string;
  date: string;
}

export interface BookingData {
  client: string;
  date: string;
  location: ILocation;
}
