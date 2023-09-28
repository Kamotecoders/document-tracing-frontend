import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../datasource/models/Users';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  url = 'http://localhost:3000/appointments/';
  user: Users | null;
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.user = localStorageService.getUser('users');
  }

  requestBurial(validID: File, schedule: Date) {
    const formData = new FormData();
    formData.append('user_id', this.user!.id.toString());
    formData.append('purpose_id', '4');
    formData.append('outlet', 'LCR');
    formData.append('appointmentDate', schedule.toISOString());
    formData.append('appointmentStatus', 'pending');
    formData.append('government_id', validID);
    return this.http.post(this.url + 'create-appointment', formData);
  }
  requestPSA(validID: File, schedule: Date) {
    const formData = new FormData();
    formData.append('user_id', this.user!.id.toString());
    formData.append('purpose_id', '2');
    formData.append('outlet', 'LCR');
    formData.append('appointmentDate', schedule.toISOString());
    formData.append('appointmentStatus', 'pending');
    formData.append('government_id', validID);
    return this.http.post(this.url + 'create-appointment', formData);
  }
  requestKasalan(validID: File, schedule: Date) {
    const formData = new FormData();
    formData.append('user_id', this.user!.id.toString());
    formData.append('purpose_id', '3');
    formData.append('outlet', `Mayor's office`);
    formData.append('appointmentDate', schedule.toISOString());
    formData.append('appointmentStatus', 'pending');
    formData.append('government_id', validID);
    return this.http.post(this.url + 'create-appointment', formData);
  }
  requestVoters(validID: File, schedule: Date) {
    const formData = new FormData();
    formData.append('user_id', this.user!.id.toString());
    formData.append('purpose_id', '1');
    formData.append('outlet', 'Comelec');
    formData.append('appointmentDate', schedule.toISOString());
    formData.append('appointmentStatus', 'pending');
    formData.append('government_id', validID);
    return this.http.post(this.url + 'create-appointment', formData);
  }
}
