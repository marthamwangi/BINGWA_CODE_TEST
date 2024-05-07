import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DeserializeBWServices } from './data.mapper';
import { BwServiceData, IBwService } from './data.model';

@Injectable({
  providedIn: 'root',
})
export class BingwaService {
  #http: HttpClient = inject(HttpClient);
  #deserializeServices: DeserializeBWServices = new DeserializeBWServices();

  getAll(): Observable<Array<any>> {
    return this.#http
      .get<Observable<any>>('http://localhost:3000/api/services')
      .pipe(
        map((response: any) => this.#deserializeServices.deserialize(response))
      );
  }
}
