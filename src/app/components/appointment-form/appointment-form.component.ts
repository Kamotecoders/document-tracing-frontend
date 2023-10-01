import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Appointment } from 'src/app/datasource/models/Appointments';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css'],
})
export class AppointmentFormComponent {
  @Input() appointment!: Appointment;
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
  updateStatus(
    id: number,
    status: 'pending' | 'schedulled' | 'cancelled' | 'complete' | 'decline'
  ) {
    this.appointmentService.updateStatus(id, status).subscribe({
      next: (v: any) => {
        this.toastr.success(v['message'], 'success');
      },
      error: (e: any) => {
        this.toastr.error(e.errors.message, 'Error');
      },
    });
  }
}
