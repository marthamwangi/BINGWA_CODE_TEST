import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DeserializeBWServiceTypes } from './data.mapper';

@Injectable({
  providedIn: 'root',
})
export class BingwaServiceType {
  #http: HttpClient = inject(HttpClient);

  #deserializeServices: DeserializeBWServiceTypes =
    new DeserializeBWServiceTypes();

  #url: string = 'http://localhost:3000/api/service-types';

  getAll(): Observable<Array<any>> {
    return this.#http
      .get<Observable<any>>(this.#url)
      .pipe(
        map((response: any) => this.#deserializeServices.deserialize(response))
      );
  }
}
