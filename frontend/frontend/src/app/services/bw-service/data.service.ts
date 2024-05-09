import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DeserializeBWServices, DeserializeOneBWService } from './data.mapper';
import { BwServiceData, IBwService } from './data.model';
import { locationUtility } from '../../utilities/location.utility';
import { SERVICES_URL } from '../../constants/constants';
@Injectable({
  providedIn: 'root',
})
export class BingwaService {
  private _locationUtility;

  constructor() {
    this._locationUtility = locationUtility();
  }

  #http: HttpClient = inject(HttpClient);

  #deserializeServices: DeserializeBWServices = new DeserializeBWServices();
  #deserializeSingleService: DeserializeOneBWService =
    new DeserializeOneBWService();

  getAll(): Observable<Array<any>> {
    return this.#http
      .get<Observable<any>>(SERVICES_URL)
      .pipe(
        map((response: any) =>
          this.#deserializeServices.deserialize(response, this._locationUtility)
        )
      );
  }

  getOne(_id: string): Observable<IBwService> {
    return this.#http
      .get<Observable<BwServiceData>>(SERVICES_URL + `/${_id}`)
      .pipe(
        map((response: any) =>
          this.#deserializeSingleService.deserialize(
            response,
            this._locationUtility
          )
        )
      );
  }

  /**
   * Get my location
   * Store my location iin the local storage
   */
}
