import { Injectable, inject } from '@angular/core';
import { BOOK_SERVICE, SERVICES_URL } from '../../constants/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BingwaBookingService {
  #http: HttpClient = inject(HttpClient);
  update(id: string, booking: any): Observable<any> {
    return this.#http.put(`${BOOK_SERVICE}/${id}`, { booking });
  }
}
