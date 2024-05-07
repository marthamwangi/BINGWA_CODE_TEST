import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'bw-filter-menu',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './filter-menu.component.html',
  styleUrl: './filter-menu.component.css',
})
export class FilterMenuComponent {
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
