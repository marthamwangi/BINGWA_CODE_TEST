import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DeserializeBWServiceTypes } from './data.mapper';
import { SERVICE_TYPES_URL } from '../../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class BingwaServiceType {
  #http: HttpClient = inject(HttpClient);

  #deserializeServices: DeserializeBWServiceTypes =
    new DeserializeBWServiceTypes();

  #url: string = SERVICE_TYPES_URL;

  getAll(): Observable<Array<any>> {
    return this.#http
      .get<Observable<any>>(this.#url)
      .pipe(
        map((response: any) => this.#deserializeServices.deserialize(response))
      );
  }
}
