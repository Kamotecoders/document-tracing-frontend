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
  _filteredAppointment: Appointment[] = [];
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
  filterAppointmentByType(purpose: number) {
    this._scheduledAppointments = this._allAppointment.filter(
      (e) => e.purpose == this.getPurpose(purpose)
    );
  }
  getPurpose(num: number) {
    switch (num) {
      case 1:
        return "VOTER'S CERTIFICATE";

      case 2:
        return 'PSA';

      case 3:
        return 'KASALANG BAYAN';

      case 4:
        return 'BURIAL ASSISTANCE';

      default:
        return;
        "VOTER'S CERTIFICATE";
    }
  }
  updateStatus(
    id: number,
    user_id: number,
    date: string,
    time: string,
    status: 'pending' | 'schedulled' | 'cancelled' | 'complete' | 'decline'
  ) {
    this.appointmentService
      .updateStatus(id, user_id, date, time, status)
      .subscribe({
        next: (v: any) => {
          this.toastr.success(v['message'], 'success');
        },
        error: (e: any) => {
          this.toastr.error(e.errors.message, 'Error');
        },
        complete: () => this.getAllAppointment(),
      });
  }
  printPage() {
    const documentToPrint = document.getElementById('appointment');
    const logo = document.getElementById('logo');
    if (documentToPrint) {
      const popupWin = window.open('', '_blank', 'width=800,height=600');
      if (popupWin) {
        popupWin.document.open();
        popupWin.document.write(`
        <html>
          <head>
            <title>Print</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
            <style>
              /* Add your custom styles for printing here */
              @media print {
                body {
                  margin: 0;
                  padding: 20px; /* Add padding for better formatting */
                }
                .centered-image {
                  display: block;
                  margin: 0 auto; /* Set margins to auto to center the image */
                }
              }
            </style>
          </head>
          <body onload="window.print();window.onafterprint=function(){window.close();}">
            <div style="text-align: center;"> <!-- Center content -->
              <img src="../../../assets/images/logo.png" class="centered-image" width="100" height="100" />
              <h5>Appointment Report</h5>
              ${documentToPrint.innerHTML}
            </div>
          </body>
        </html>
      `);
        popupWin.document.close();
      } else {
        console.error('Failed to open popup window for printing.');
      }
    } else {
      console.error(`Document with ID 'appointment' not found.`);
    }
  }
  statusChecker(status: string) {
    if (status === 'schedulled') {
      return 'scheduled';
    }
    return status;
  }
}
