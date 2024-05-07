import { Component, OnInit, inject } from '@angular/core';
import { IonicModule, RefresherCustomEvent } from '@ionic/angular';

import { BingwaService } from '../services/bw-service/data.service';
import { NgFor } from '@angular/common';
import { IBwService } from '../services/bw-service/data.model';

@Component({
  selector: 'bt-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, NgFor],
})
export class HomePage implements OnInit {
  #bwServices = inject(BingwaService);
  bwServices: Array<IBwService> = [];

  ngOnInit(): void {
    this._getServices();
  }

  private _getServices(): void {
    this.#bwServices
      .getAll()
      .pipe()
      .subscribe({
        next: (data) => {
          this.bwServices = data;
          console.log('bwServices', this.#bwServices);
        },
      });
  }
}
