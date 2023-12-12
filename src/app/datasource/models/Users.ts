import { QueryDocumentSnapshot } from '@angular/fire/firestore';

export interface Users {
  id: string;
  fullname: string;
  address: string;
  gender: string;
  birthdate: Date;
  age: number;
  status: string;
  phone: string;
  type: string;
  email: string;
}

export enum UserType {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const userConverter = {
  toFirestore: (data: Users) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as Users,
};
