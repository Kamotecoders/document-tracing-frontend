import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  _selectedAppointment: Appointment | null = null;
  constructor(
    private appointmentService: AppointmentService,
    private toastr: ToastrService
  ) {
    this.getAllAppointment();
  }

  setSelected(index: number) {
    this._selectedAppointment = this._pendingRequest[index];
  }
  getAllAppointment() {
    this.appointmentService.getAllAppointments().subscribe({
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
      complete: () => this.getAllAppointment(),
    });
  }
}
