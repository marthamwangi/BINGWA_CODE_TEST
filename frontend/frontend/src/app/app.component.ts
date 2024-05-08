import { Component, OnInit, inject } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { StorageService } from './services/storage.service';
import { ILocation } from './services/bw-service/data.model';
import { LOCATION_STORAGE_KEY } from './constants/constants';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  #storageService = inject(StorageService);

  ngOnInit(): void {
    this._printCurrentPosition();
  }
  /**
   * Get my location
   */
  private async _printCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    let location = {
      latitude: coordinates.coords.latitude,
      longitude: coordinates.coords.longitude,
    };
    this._createLocation(location);
  }

  private _createLocation(coords: ILocation) {
    this.#storageService.storageAPI('create', LOCATION_STORAGE_KEY, coords);
  }
}
