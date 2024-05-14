import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { IBwService } from '../services/bw-service/data.model';
import { Router } from '@angular/router';
import { FilterMenuComponent } from './section/filter-menu/filter-menu.component';
import { BookingComponent } from '../booking/booking.component';

@Component({
  selector: 'bt-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgFor,
    CurrencyPipe,
    FilterMenuComponent,
    BookingComponent,
    NgIf,
  ],
})
export class HomePage {
  #router: Router = inject(Router);
  bwServices: Array<IBwService> = [];
  bookicon = 'assets/icon/solar_home-add-bold-duotone.svg';
  filtericon = 'assets/icon/lets-icons_filter-alt-duotone-line.svg';
  showToast$: boolean = false;
  showToastMessage$: string = 'empty';
  serviceId: string = '';
  getRandomColor() {
    var color = Math.floor(Math.random() * 16777215).toString(16);
    return color;
  }

  onLoadServices($event: any) {
    this.bwServices = $event;
  }
  onSeviceClick(id: string) {
    this.#router.navigate([id]);
  }

  onBooking($clickEvent: MouseEvent, id: string) {
    $clickEvent.stopImmediatePropagation();
    $clickEvent.preventDefault();
    this.serviceId = id;
  }

  toggleToast($event: any) {
    this.showToast$ = $event.show;
    this.showToastMessage$ = $event.message;
  }
}
