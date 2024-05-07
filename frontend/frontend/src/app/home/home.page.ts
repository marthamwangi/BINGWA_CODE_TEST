import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { BingwaService } from '../services/bw-service/data.service';
import { CurrencyPipe, NgFor } from '@angular/common';
import { IBwService } from '../services/bw-service/data.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterMenuComponent } from './section/filter-menu/filter-menu.component';

@Component({
  selector: 'bt-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, NgFor, CurrencyPipe, FilterMenuComponent],
})
export class HomePage implements OnInit {
  #bwServices = inject(BingwaService);
  #router: Router = inject(Router);
  #activatedRouter: ActivatedRoute = inject(ActivatedRoute);

  bwServices: Array<IBwService> = [];
  bookicon = 'assets/icon/solar_home-add-bold-duotone.svg';
  filtericon = 'assets/icon/lets-icons_filter-alt-duotone-line.svg';

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
        },
      });
  }

  onSeviceClick(id: string) {
    this.#router.navigate([id], { relativeTo: this.#activatedRouter });
  }
}
