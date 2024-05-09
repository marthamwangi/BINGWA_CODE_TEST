import { BookingData, IBooking } from './data.model';

export class SerializeBooking {
  serialize(booking: IBooking, location: Function): BookingData {
    return {
      client: booking.client,
      date: booking.date,
      location: location(),
    };
  }
}
