import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/datasource/models/Appointments';
import { Users } from 'src/app/datasource/models/Users';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';

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
  users: Users | null;
  constructor(
    private appointmentService: AppointmentService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.getAllAppointment();
    this.users = null;
    authService.getCurrentUser().subscribe((data) => {
      if (data !== null) {
        authService.getUser(data.uid).then((data) => {
          this.users = data.data() ?? null;
          console.log(this.users);
        });
      }
    });
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
    id: string,
    email: string,
    to_name: string,
    status: 'pending' | 'scheduled' | 'cancelled' | 'complete' | 'decline',
    date: string
  ) {
    this.appointmentService
      .updateStatus(
        id,
        this.users?.fullname ?? '',
        to_name,
        status,
        email,
        date
      )
      .then((data) => this.toastr.success(`Appointment ${status}`))
      .catch((err) => this.toastr.error(err));
  }
}
