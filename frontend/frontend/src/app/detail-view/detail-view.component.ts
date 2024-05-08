import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BingwaService } from '../services/bw-service/data.service';
import { Observable, firstValueFrom, map } from 'rxjs';
import { IBwService } from '../services/bw-service/data.model';
import { IonicModule } from '@ionic/angular';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'bw-detail-view',
  standalone: true,
  imports: [IonicModule, NgIf, CurrencyPipe, NgFor, RouterLink],
  templateUrl: './detail-view.component.html',
  styleUrl: './detail-view.component.scss',
})
export class DetailViewComponent implements OnInit {
  #activatedRouter: ActivatedRoute = inject(ActivatedRoute);
  #bwServiceReq = inject(BingwaService);
  bookicon = 'assets/icon/solar_home-add-bold-duotone.svg';
  service!: IBwService;

  ngOnInit(): void {
    this._getParam();
  }
  private async _getParam() {
    const param: Observable<string> = this.#activatedRouter.params.pipe(
      map((p) => p['id'])
    );
    let id = await firstValueFrom(param);
    this._getServices(id);
  }
  private _getServices(id: string) {
    this.#bwServiceReq
      .getOne(id)
      .pipe()
      .subscribe({
        next: (s) => {
          this.service = s;
        },
      });
  }
}
