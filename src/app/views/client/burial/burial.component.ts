import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';

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
  constructor(private appointmentService: AppointmentService) {}
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
          .requestBurial(this.validID, schedule)
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
