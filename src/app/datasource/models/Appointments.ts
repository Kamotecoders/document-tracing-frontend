import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import emailjs from '@emailjs/browser';
export interface Appointment {
  id: string;
  userID: string;
  fullname: string;
  outlet: 'LCR' | 'COMELEC' | "MAYOR'S OFFICE";
  date: string;
  time: string;
  email: string;
  government_id: string;

  purpose:
    | 'BURIAL ASSISTANCE'
    | 'KASALANG BAYAN'
    | 'PSA'
    | "VOTER'S CERTIFICATE";
  appointmentStatus:
    | 'pending'
    | 'scheduled'
    | 'cancelled'
    | 'complete'
    | 'decline';

  createdAt: Date;
}

export const appointmentConverted = {
  toFirestore: (data: Appointment) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as Appointment,
};
