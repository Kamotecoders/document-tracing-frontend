import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Users } from 'src/app/datasource/models/Users';
import { AppointmentService } from 'src/app/services/appointment.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-voters',
  templateUrl: './voters.component.html',
  styleUrls: ['./voters.component.css'],
})
export class VotersComponent {
  validID: File | null = null;
  id!: number;
  permissionSlipForm = new FormGroup({
    validID: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
  });
  constructor(
    private appointmentService: AppointmentService,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.id = +params['id'];
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
      if (dateValue && timeValue) {
        const schedule = new Date(dateValue);
        const [hoursString, minutesString] = timeValue.split(':');
        const hours = +hoursString;
        const minutes = +minutesString;
        schedule.setHours(hours);
        schedule.setMinutes(minutes);
        this.appointmentService
          .requestVoters(this.validID, schedule, this.id)
          .subscribe({
            next: (v: any) => {
              alert(v['message']);
            },
            error: (e) => alert(e.message),
            complete: () => {
              this.permissionSlipForm.reset();
              this.validID = null;
            },
          });
      }
    }
  }
}
// task.component.ts

