import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IBwService } from '../../../services/bw-service/data.model';
import { AsyncPipe, CurrencyPipe, NgFor } from '@angular/common';
import { BingwaService } from '../../../services/bw-service/data.service';
import { BingwaServiceType } from '../../../services/bw-service-types/data.service';
import { IBwServiceType } from '../../../services/bw-service-types/data.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'bw-filter-menu',
  standalone: true,
  imports: [IonicModule, NgFor, AsyncPipe, CurrencyPipe],
  templateUrl: './filter-menu.component.html',
  styleUrl: './filter-menu.component.css',
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
  #filterObject: { [filterKey: string]: boolean } = {};

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
          this.minDistance = Math.min(
            ...data.map((d) => d.serviceProvider.distance)
          );
          this.maxDistance = Math.max(
            ...data.map((d) => d.serviceProvider.distance)
          );
        },
      });
  }

  /**
   * filter rendered services according to the selected ids
   * @param $event
   */
  onBWServiceTypeChange($event: any, serviceType: string) {
    this.#filterObject[serviceType] = $event.detail.checked;
    this._applyFilters();
  }

  private _applyFilters(): void {
    let visibleServices: Array<IBwService> = [];

    /**
     * check if the filter object is empty or not
     */
    const hasOnFilter =
      Object.values(this.#filterObject).filter(
        (keyProperty) => keyProperty === true
      ).length !== 0;

    if (hasOnFilter) {
      /**
       * there is atleast one applied filet
       */
      for (const filterKey in this.#filterObject) {
        if (this.#filterObject[filterKey]) {
          visibleServices = [
            ...visibleServices,
            ...this.#bwServices.filter(
              (service) => service.serviceType === filterKey
            ),
          ];
        }
      }
    } else {
      visibleServices = this.#bwServices;
    }

    /**
     * emit the output
     */
    this.services$.emit(visibleServices);
    this.results$.next(visibleServices.length);
  }

  /**
   * Get the price on KnobEnd event
   * @param $ev
   */
  onPriceIonKnobChange($ev: any) {
    let visibleServices: Array<IBwService> = [];
    let ev = $ev.detail.value;
    let lower = ev.lower;
    let upper = ev.upper;
    visibleServices = this.#bwServices.filter(
      (s) => parseInt(s.price) >= lower && parseInt(s.price) <= upper
    );
    this.services$.emit(visibleServices);
    this.results$.next(visibleServices.length);
  }
  pinPriceFormatter(value: number) {
    return `KES ${value}`;
  }

  pinDistanceFormatter(value: number) {
    return `${value}`;
  }

  onDistanceIonKnobMoveEnd($ev: any) {
    let visibleServices: Array<IBwService> = [];
    let ev = $ev.detail.value;
    let lower = parseInt(ev.lower);
    let upper = parseInt(ev.upper);
    visibleServices = this.#bwServices.filter(
      (s) =>
        s.serviceProvider.distance >= lower &&
        s.serviceProvider.distance <= upper
    );
    this.services$.emit(visibleServices);
    this.results$.next(visibleServices.length);
  }
}
