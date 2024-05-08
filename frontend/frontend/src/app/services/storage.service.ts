import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ILocation } from './bw-service/data.model';
import { LOCATION_STORAGE_KEY } from '../constants/constants';

type StorageAction = 'create' | 'read';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _coordinates$: BehaviorSubject<ILocation>;

  constructor() {
    this._coordinates$ = new BehaviorSubject<ILocation>({
      longitude: 0,
      latitude: 0,
    });
  }

  public setCoordinates() {
    this._coordinates$.next(this._getFromStorage(LOCATION_STORAGE_KEY));
  }

  public storageAPI(
    action: StorageAction,
    key: string,
    payload?: ILocation
  ): any {
    switch (action) {
      case 'create':
        return payload && this._create(key, payload);
      case 'read':
        return this._read();
    }
  }

  private _create(key: string, data: any) {
    this._updateStorage(key, data);
    this.setCoordinates();
  }

  private _read(): ILocation {
    let location: ILocation = { latitude: 0, longitude: 0 };
    this._coordinates$.subscribe({
      next: (l) => (location = l),
      complete: () => console.info('complete', location),
    });
    return location;
  }

  private _getFromStorage(key: string): ILocation {
    const myCoordinates = localStorage.getItem(key);
    if (myCoordinates) {
      return JSON.parse(myCoordinates);
    }
    return { latitude: 0, longitude: 0 };
  }

  private _updateStorage(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
