import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-psa',
  templateUrl: './psa.component.html',
  styleUrls: ['./psa.component.css'],
})
export class PsaComponent {
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
        this.appointmentService.requestPSA(this.validID, schedule).subscribe({
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
