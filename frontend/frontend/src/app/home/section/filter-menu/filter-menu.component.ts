import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IBwService } from '../../../services/bw-service/data.model';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { BingwaService } from '../../../services/bw-service/data.service';
import { BingwaServiceType } from '../../../services/bw-service-types/data.service';
import { IBwServiceType } from '../../../services/bw-service-types/data.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'bw-filter-menu',
  standalone: true,
  imports: [IonicModule, NgFor, AsyncPipe, CurrencyPipe, NgIf],
  templateUrl: './filter-menu.component.html',
})
export class FilterMenuComponent implements OnInit {
  @Output() services$ = new EventEmitter<Array<IBwService>>();
  #bwServiceReq = inject(BingwaService);
  #bwServiceTypesReq = inject(BingwaServiceType);
  #bwServices: Array<IBwService> = [];
  results$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  bwServiceTypes: Array<IBwServiceType> = [];
  renderedServices: Array<IBwService> = [];
  minPrice: number = 0;
  maxPrice: number = 0;
  minDistance: number = 0;
  maxDistance: number = 0;
  #filterObject: {
    serviceType: { [filterKey: string]: boolean };
    price?: { lower: number; upper: number };
    distance?: { lower: number; upper: number };
  } = {
    serviceType: {},
  };

  ngOnInit(): void {
    this._getServices();
    this._getServiceTypes();
  }
  private _getServiceTypes() {
    this.#bwServiceTypesReq
      .getAll()
      .pipe()
      .subscribe({
        next: (data) => {
          this.bwServiceTypes = data;
        },
      });
  }
  private _getServices(): void {
    this.#bwServiceReq
      .getAll()
      .pipe()
      .subscribe({
        next: (data: IBwService[]) => {
          this.#bwServices = data;
          this.renderedServices = data;
          this.services$.emit(this.renderedServices);
          this.results$.next(this.renderedServices.length);
          let priceArr = data.map((d) => parseInt(d.price));
          this.maxPrice = Math.max(...priceArr);
          this.minPrice = Math.min(...priceArr);
          this.minDistance = Math.min(...data.map((d) => d.distance));
          this.maxDistance = Math.max(...data.map((d) => d.distance));
        },
      });
  }

  /**
   * filter rendered services according to the selected ids
   * @param $event
   */
  onBWServiceTypeChange($event: any, serviceType: string) {
    this.#filterObject.serviceType[serviceType] = $event.detail.checked;
    this._applyFilters();
  }

  private _applyFilters(): void {
    /**
     * check if the filter object is empty or not
     */
    const availableFilters = [];
    for (const key in this.#filterObject) {
      /**
       * check if there is a service type that is on for filtering
       */
      if (key === 'serviceType') {
        if (
          Object.values(this.#filterObject.serviceType).filter(
            (keyProperty) => keyProperty === true
          ).length !== 0
        ) {
          availableFilters.push(key);
        }
      }

      /**
       * check if there is a price that is on for filtering
       */
      if (key === 'price') {
        if (
          this.#filterObject.price?.lower !== this.minPrice ||
          this.#filterObject.price.upper !== this.maxPrice
        ) {
          availableFilters.push(key);
        }
      }

      /**
       * check if there is a distance for filtering
       */
      if (key === 'distance') {
        if (
          this.#filterObject.distance?.lower !== this.minDistance ||
          this.#filterObject.distance.upper !== this.maxDistance
        ) {
          availableFilters.push(key);
        }
      }
    }

    let visibleServices: Array<IBwService> = this.#bwServices;
    if (availableFilters.length) {
      for (const filterKey in this.#filterObject) {
        /**
         * filter out services
         */
        if (availableFilters.includes('serviceType')) {
          const visibleServiceKeys = Object.entries(
            this.#filterObject.serviceType
          )
            .filter((entry) => entry[1] === true)
            .map((entry) => entry[0]);
          visibleServices = visibleServices.filter((service) =>
            visibleServiceKeys.includes(service.serviceType)
          );
        }

        /**
         * filter out price
         */
        if (availableFilters.includes('price')) {
          if (this.#filterObject.price) {
            visibleServices = this.#minMaxFilter(
              visibleServices,
              this.#filterObject.price?.lower,
              this.#filterObject.price?.upper,
              'price'
            ) as Array<IBwService>;
          }
        }

        /**
         * filter out distance
         */
        if (availableFilters.includes('distance')) {
          if (this.#filterObject.distance) {
            visibleServices = this.#minMaxFilter(
              visibleServices,
              this.#filterObject.distance?.lower,
              this.#filterObject.distance?.upper,
              'distance'
            ) as Array<IBwService>;
          }
        }
      }
    }

    /**
     * emit the output
     */
    this.services$.emit(visibleServices);
    this.results$.next(visibleServices.length);
  }

  /**
   *
   * @param services
   * @param min
   * @param max
   * @param filterByKey
   * @returns
   *
   * A shared utility function for filtering out items within a range
   */
  #minMaxFilter(
    services: Array<{ [key: string]: any }>,
    min: number,
    max: number,
    filterByKey: string
  ): Array<{ [key: string]: any }> {
    return services.filter((service) => {
      const fieldValue = parseInt(service[filterByKey]);
      return fieldValue >= min && fieldValue <= max;
    });
  }

  /**
   * Get the price on KnobEnd event
   * @param $ev
   */
  onPriceIonKnobChange($ev: any) {
    const ev = $ev.detail.value;
    this.#filterObject['price'] = { lower: ev.lower, upper: ev.upper };
    this._applyFilters();
  }

  pinPriceFormatter(value: number) {
    return `KES ${value}`;
  }

  pinDistanceFormatter(value: number) {
    return `${value}`;
  }

  onDistanceIonKnobMoveEnd($ev: any) {
    const ev = $ev.detail.value;
    this.#filterObject['distance'] = { lower: ev.lower, upper: ev.upper };
    this._applyFilters();
  }
}
