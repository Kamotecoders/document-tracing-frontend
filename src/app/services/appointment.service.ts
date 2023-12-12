import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../datasource/models/Users';
import { LocalStorageService } from './local-storage.service';
import { Appointment } from '../datasource/models/Appointments';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import emailjs from '@emailjs/browser';
import { getMessageForStatus } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  url = 'http://localhost:3000/appointments/';
  COLLECTION_NAME = 'appointments';
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private storage: Storage,
    private firestore: Firestore
  ) {}
  updateStatus(
    id: string,
    from_name: string,
    to_name: string,
    appointmentStatus:
      | 'pending'
      | 'scheduled'
      | 'cancelled'
      | 'complete'
      | 'decline',
    email: string,
    date: string
  ) {
    this.sendEmail(
      from_name,
      to_name,
      email,
      getMessageForStatus(date, appointmentStatus)
    );
    return updateDoc(doc(this.firestore, this.COLLECTION_NAME, id), {
      appointmentStatus: appointmentStatus,
    });
  }

  async createAppointment(validID: File, appointment: Appointment) {
    appointment.id = this.generateRandomString(20);
    let result = await this.uploadsSingleImage('gov_id', validID);
    appointment.government_id = result;
    console.log(appointment);
    return setDoc(
      doc(this.firestore, this.COLLECTION_NAME, appointment.id),
      appointment
    ).catch((err) => {
      console.log(err);
    });
  }

  generateRandomString(length: number) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  getAllAppointments(): Observable<Appointment[]> {
    const q = query(
      collection(this.firestore, this.COLLECTION_NAME),
      orderBy('createdAt', 'asc')
    );
    return collectionData(q) as Observable<Appointment[]>;
  }
  async uploadsSingleImage(title: string, file: File) {
    try {
      const fireRef = ref(
        this.storage,
        `${this.COLLECTION_NAME}/${title}/${this.generateRandomString(30)}`
      );
      await uploadBytes(fireRef, file);
      const downloadURL = await getDownloadURL(fireRef);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  sendEmail(from_name: string, name: string, email: string, message: string) {
    const templateParams = {
      to_name: name,
      from_name: from_name,
      to_email: email,
      message: message,
    };

    emailjs
      .send(
        environment.SERVICE_ID,
        environment.TEMPLATE_ID,
        templateParams,
        environment.PUBLIC_KEY
      )
      .then(
        (response) => {
          console.log('email sent to ', email);
        },
        (err) => {
          console.log('FAILED...', err);
        }
      );
  }
}
