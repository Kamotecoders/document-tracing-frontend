import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../datasource/models/Users';
import { LocalStorageService } from './local-storage.service';
import { Appointment } from '../datasource/models/Appointments';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  url = 'http://localhost:3000/appointments/';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}
  updateStatus(
    id: number,
    user_id: number,
    date: string,
    time: string,
    appointmentStatus:
      | 'pending'
      | 'schedulled'
      | 'cancelled'
      | 'complete'
      | 'decline'
  ) {
    const queryParameters = { id };

    const requestBody = {
      appointmentStatus: appointmentStatus,
      user_id: user_id,
      date: date,
      time: time,
    };

    return this.http.patch(this.url + 'update-status', requestBody, {
      params: queryParameters,
    });
  }
  getAllAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.url).pipe(
      map((appointments: Appointment[]) => {
        // Map each appointment and prepend the URL
        return appointments.map((appointment) => ({
          ...appointment,
          government_id:
            'http://localhost:3000/images/' + appointment.government_id,
        }));
      })
    );
  }
  requestBurial(validID: File, schedule: Date, user_id: number) {
    const formData = new FormData();
    formData.append('user_id', user_id.toString());
    formData.append('purpose_id', '4');
    formData.append('outlet', 'LCR');
    formData.append('appointmentDate', formatDateTime(schedule));
    formData.append('appointmentStatus', 'pending');
    formData.append('government_id', validID);
    return this.http.post(this.url + 'create-appointment', formData);
  }
  requestPSA(validID: File, schedule: Date, user_id: number) {
    const formData = new FormData();
    formData.append('user_id', user_id.toString());
    formData.append('purpose_id', '2');
    formData.append('outlet', 'LCR');
    formData.append('appointmentDate', formatDateTime(schedule));
    formData.append('appointmentStatus', 'pending');
    formData.append('government_id', validID);
    return this.http.post(this.url + 'create-appointment', formData);
  }
  requestKasalan(validID: File, schedule: Date, user_id: number) {
    const formData = new FormData();
    formData.append('user_id', user_id.toString());
    formData.append('purpose_id', '3');
    formData.append('outlet', `Mayor's office`);
    formData.append('appointmentDate', formatDateTime(schedule));
    formData.append('appointmentStatus', 'pending');
    formData.append('government_id', validID);
    return this.http.post(this.url + 'create-appointment', formData);
  }
  requestVoters(validID: File, schedule: Date, user_id: number) {
    const formData = new FormData();
    formData.append('user_id', user_id.toString());
    formData.append('purpose_id', '1');
    formData.append('outlet', 'Comelec');
    formData.append('appointmentDate', formatDateTime(schedule));
    formData.append('appointmentStatus', 'pending');
    formData.append('government_id', validID);
    return this.http.post(this.url + 'create-appointment', formData);
  }
}

function formatDateTime(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
}
