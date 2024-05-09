import { Injectable, inject } from '@angular/core';
import { BOOK_SERVICE } from '../../constants/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SerializeBooking } from './data.mapper';
import { locationUtility } from '../../utilities/location.utility';
import { BookingData, IBooking } from './data.model';

@Injectable({
  providedIn: 'root',
})
export class BingwaBookingService {
  #http: HttpClient = inject(HttpClient);
  #serializeBooking: SerializeBooking = new SerializeBooking();
  private _locationUtility;

  constructor() {
    this._locationUtility = locationUtility();
  }

  update(id: string, booking: IBooking): Observable<any> {
    return this.#http.put(
      `${BOOK_SERVICE}/${id}`,
      this.#serializeBooking.serialize(booking, this._locationUtility)
    );
  }
}
