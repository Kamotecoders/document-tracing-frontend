import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/datasource/models/Appointments';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent {
  _pendingRequest: Appointment[] = [];
  _scheduledAppointments: Appointment[] = [];
  _allAppointment: Appointment[] = [];
  constructor(private appointmentService: AppointmentService) {
    appointmentService.getAllAppointments().subscribe({
      next: (v: Appointment[]) => {
        this._pendingRequest = v.filter(
          (data) => data.appointmentStatus === 'pending'
        );
        this._scheduledAppointments = v.filter(
          (data) => data.appointmentStatus !== 'pending'
        );
        this._allAppointment = v;
      },
    });
  }

  getDocumentTypeNumber(purpose: number): number {
    switch (purpose) {
      case 1:
        return this._allAppointment.filter(
          (data) => data.purpose === "VOTER'S CERTIFICATE"
        ).length;
      case 2:
        return this._allAppointment.filter((data) => data.purpose === 'PSA')
          .length;
      case 3:
        return this._allAppointment.filter(
          (data) => data.purpose === 'KASALANG BAYAN'
        ).length;
      case 4:
        return this._allAppointment.filter(
          (data) => data.purpose === 'BURIAL ASSISTANCE'
        ).length;
      default:
        return 0;
    }
  }
}
