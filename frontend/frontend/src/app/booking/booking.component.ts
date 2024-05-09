import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonModal, IonicModule } from '@ionic/angular';
import { BingwaBookingService } from '../services/booking/data.service';
import { IBooking } from '../services/booking/data.model';

@Component({
  selector: 'bw-booking',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './booking.component.html',
})
export class BookingComponent {
  @ViewChild(IonModal, { static: true }) modal!: IonModal;
  @Input() id!: string;
  @Input() modalId!: string;
  @Output() showBookingToast$ = new EventEmitter<{
    message: string;
    show: boolean;
  }>();
  @Output() dismissModal$ = new EventEmitter<boolean>();

  #bookingService: BingwaBookingService = inject(BingwaBookingService);
  name!: string;
  currentDate = Date.now();
  date: string = new Date(this.currentDate).toISOString();
  isBooking: boolean = false;

  ngOnInit(): void {
    this.modal.present();
    this.#listenForBackdropClick();
  }

  #listenForBackdropClick(): void {
    this.modal.onDidDismiss().then(() => {
      this.#emitModalDismissed();
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  #emitModalDismissed(): void {
    this.dismissModal$.emit();
  }

  /**
   * Make a booking
   * once a booking is made
   * create a toast and dismiss modal
   * on error
   * create error toast
   */
  onBook() {
    const booking: IBooking = {
      client: this.name,
      date: this.date,
    };
    this.isBooking = true;

    this.#bookingService.update(this.id, booking).subscribe({
      next: (res) => {
        this.isBooking = false;
        this.showToast(res.message, true);
        this.modal.dismiss(this.name, 'confirm');
      },
      error: (res) => {
        this.isBooking = false;
        this.showToast('An error Occured please Try again', true);
      },
    });
  }
  showToast(message: string, show: boolean) {
    this.showBookingToast$.emit({ message, show });
  }
}
