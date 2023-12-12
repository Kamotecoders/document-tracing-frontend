import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs';
import { Users, userConverter } from '../datasource/models/Users';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  user,
} from '@angular/fire/auth';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  COLLECTION_NAME = 'users';
  users!: Users | null;
  url = 'http://localhost:3000/auth/';
  constructor(private auth: Auth, private firestore: Firestore) {}
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  async register(email: string, password: string, users: Users) {
    const user = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    users.id = user.user.uid;
    return setDoc(doc(this.firestore, this.COLLECTION_NAME, users.id), users);
  }

  forgotPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }
  getUser(uid: string) {
    return getDoc(
      doc(this.firestore, this.COLLECTION_NAME, uid).withConverter(
        userConverter
      )
    );
  }

  getCurrentUser() {
    return user(this.auth);
  }
  logout() {
    return this.auth.signOut();
  }
  setUsers(user: Users) {
    this.users = user;
  }
  getUsers() {
    return this.users;
  }
}
