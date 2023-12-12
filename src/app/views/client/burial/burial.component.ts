import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Appointment } from 'src/app/datasource/models/Appointments';
import { Users } from 'src/app/datasource/models/Users';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { getAMPM } from 'src/app/utils/constants';

@Component({
  selector: 'app-burial',
  templateUrl: './burial.component.html',
  styleUrls: ['./burial.component.css'],
})
export class BurialComponent implements OnInit {
  validID: File | null = null;

  permissionSlipForm = new FormGroup({
    validID: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
  });
  users: Users | null;
  constructor(
    private appointmentService: AppointmentService,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
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
  ngOnInit(): void {}

  onSelectImage(event: any) {
    this.validID = event.target.files[0];
  }
  submitRequest() {
    if (this.permissionSlipForm.valid && this.validID !== null) {
      const dateValue = this.permissionSlipForm.controls.date.value;
      const timeValue = this.permissionSlipForm.controls.time.value;
      const appointment: Appointment = {
        id: '',
        userID: this.users?.id ?? 'unknown user',
        fullname: this.users?.fullname ?? 'unknown user',
        outlet: 'LCR',
        date: dateValue ?? '',
        time: timeValue + ' ' + getAMPM(timeValue ?? ''),
        government_id: '',
        purpose: 'BURIAL ASSISTANCE',
        appointmentStatus: 'pending',
        email: this.users?.email ?? '',
        createdAt: new Date(),
      };
      this.appointmentService
        .createAppointment(this.validID, appointment)
        .then((data) => {
          this.toastr.success('Successful Appointment');
        })
        .catch((err) => {
          console.log(err);
          this.toastr.error(err);
        });
    }
  }
}
