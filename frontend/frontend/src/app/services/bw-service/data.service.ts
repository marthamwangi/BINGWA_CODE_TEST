import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DeserializeBWServices, DeserializeOneBWService } from './data.mapper';
import {
  BwServiceData,
  IBwService,
  IPriceRange,
  IProximity,
} from './data.model';

@Injectable({
  providedIn: 'root',
})
export class BingwaService {
  #http: HttpClient = inject(HttpClient);

  #deserializeServices: DeserializeBWServices = new DeserializeBWServices();
  #deserializeSingleService: DeserializeOneBWService =
    new DeserializeOneBWService();

  #url: string = 'http://localhost:3000/api/services';

  getAll(): Observable<Array<any>> {
    return this.#http
      .get<Observable<any>>(this.#url)
      .pipe(
        map((response: any) => this.#deserializeServices.deserialize(response))
      );
  }

  getOne(_id: string): Observable<IBwService> {
    return this.#http
      .get<Observable<BwServiceData>>(`${this.#url}/${_id}`)
      .pipe(
        map((response: any) =>
          this.#deserializeSingleService.deserialize(response)
        )
      );
  }

  // getByFilter(
  //   prox: IProximity,
  //   service: string,
  //   price: IPriceRange
  // ): Observable<Array<any>> {
  //   return this.#http
  //     .get<Observable<Array<any>>>(this.#url, {
  //       params: {
  //         proximity: prox,
  //         service:service,
  //         price: price
  //       },
  //     })
  //     .pipe(
  //       map((response: any) => this.#deserializeServices.deserialize(response))
  //     );
  // }
}
