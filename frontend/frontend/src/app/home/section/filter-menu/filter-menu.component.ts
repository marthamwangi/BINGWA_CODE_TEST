import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IBwService } from '../../../services/bw-service/data.model';
import { NgFor } from '@angular/common';
import { BingwaService } from '../../../services/bw-service/data.service';
import { BingwaServiceType } from '../../../services/bw-service-types/data.service';
import { IBwServiceType } from '../../../services/bw-service-types/data.model';

@Component({
  selector: 'bw-filter-menu',
  standalone: true,
  imports: [IonicModule, NgFor],
  templateUrl: './filter-menu.component.html',
  styleUrl: './filter-menu.component.css',
})
export class FilterMenuComponent implements OnInit {
  @Output() services$ = new EventEmitter<Array<IBwService>>();
  #bwServiceReq = inject(BingwaService);
  #bwServiceTypesReq = inject(BingwaServiceType);
  bwServices: Array<IBwService> = [];
  bwServiceTypes: Array<IBwServiceType> = [];
  renderedServices: Array<IBwService> = [];

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
        next: (data) => {
          this.bwServices = data;
          this.renderedServices = data;
          this.services$.emit(this.renderedServices);
        },
      });
  }

  onBWServiceChange($event: any) {
    console.log('event.detail.value', $event.detail.value);
    const id = $event.detail.value.id;
    /**
     * filter rendered services according to the selected ids
     */
    this.renderedServices = this.bwServices.filter(
      (service) => service.id === id
    );
    this.services$.emit(this.renderedServices);
  }
  onDistanceIonKnobMoveStart($event: any) {
    console.log('onIonKnobMoveStart', $event.detail.value);
  }
  onDistanceIonKnobMoveEnd($event: any) {
    console.log('onIonKnobMoveEnd', $event.detail.value);
  }
  onPriceIonKnobMoveStart($event: any) {
    console.log('onIonKnobMoveStart', $event.detail.value);
  }
  onPriceIonKnobMoveEnd($event: any) {
    console.log('onIonKnobMoveEnd', $event.detail.value);
  }
  onServiceItem(item: string) {
    console.log('servce', item);
  }
}
