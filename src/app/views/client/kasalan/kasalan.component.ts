import { Component } from '@angular/core';
import { user } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Appointment } from 'src/app/datasource/models/Appointments';
import { Users } from 'src/app/datasource/models/Users';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { getAMPM } from 'src/app/utils/constants';

@Component({
  selector: 'app-kasalan',
  templateUrl: './kasalan.component.html',
  styleUrls: ['./kasalan.component.css'],
})
export class KasalanComponent {
  validID: File | null = null;
  id!: number;
  users: Users | null;
  permissionSlipForm = new FormGroup({
    validID: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
  });
  constructor(
    private appointmentService: AppointmentService,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.id = +params['id'];
      }
    });
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
        purpose: 'KASALANG BAYAN',
        appointmentStatus: 'pending',
        email: this.users?.email ?? 'unknown user',
        createdAt: new Date(),
      };
      this.appointmentService
        .createAppointment(this.validID, appointment)
        .then((data) => {
          this.toastr.success('Successful Appointment');
        })
        .catch((err) => {
          this.toastr.error(err);
        });
    }
    // if (this.permissionSlipForm.valid && this.validID !== null) {
    //   const dateValue = this.permissionSlipForm.controls.date.value;
    //   const timeValue = this.permissionSlipForm.controls.time.value;
    //   if (dateValue && timeValue) {
    //     const schedule = new Date(dateValue);
    //     const [hoursString, minutesString] = timeValue.split(':');
    //     const hours = +hoursString;
    //     const minutes = +minutesString;
    //     schedule.setHours(hours);
    //     schedule.setMinutes(minutes);
    //     this.appointmentService
    //       .requestKasalan(this.validID, schedule, this.id)
    //       .subscribe({
    //         next: (v: any) => {
    //           alert(v['message']);
    //         },
    //         error: (e) => alert(e.message),
    //         complete: () => {
    //           this.permissionSlipForm.reset();
    //           this.validID = null;
    //         },
    //       });
    //   }
    // }
  }
}
