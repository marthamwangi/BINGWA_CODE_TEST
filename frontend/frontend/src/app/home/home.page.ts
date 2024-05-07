import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { BingwaService } from '../services/bw-service/data.service';
import { CurrencyPipe, NgFor } from '@angular/common';
import { IBwService } from '../services/bw-service/data.model';

@Component({
  selector: 'bt-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, NgFor, CurrencyPipe],
})
export class HomePage implements OnInit {
  #bwServices = inject(BingwaService);
  bwServices: Array<IBwService> = [];
  bookicon = 'assets/icon/solar_home-add-bold-duotone.svg';

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
