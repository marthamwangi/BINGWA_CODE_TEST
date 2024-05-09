import { Injectable, inject } from '@angular/core';
import { SERVICES_URL } from '../../constants/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BingwaBookingService {
  #http: HttpClient = inject(HttpClient);
  #url: string = SERVICES_URL;

  update(id: string, booking: any): Observable<any> {
    return this.#http.put(`${this.#url}/booking/${id}`, { booking });
  }
}
