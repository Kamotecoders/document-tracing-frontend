import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Appointment } from 'src/app/datasource/models/Appointments';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css'],
})
export class AppointmentFormComponent {
  @Input() appointment: Appointment | null = null;
  @Output() onAccept: EventEmitter<void> = new EventEmitter<void>();
  @Output() onDecline: EventEmitter<void> = new EventEmitter<void>();
  constructor(
    private appointmentService: AppointmentService,
    private toastr: ToastrService
  ) {}
  getMeridiam(time: string): 'AM' | 'PM' {
    if (Number(time.substring(0, 2)) < 12) {
      return 'AM';
    }
    return 'PM';
  }

  acceptFunc() {
    this.onAccept.emit();
  }
  declineFunc() {
    this.onDecline.emit();
  }
}
