import { Injectable } from '@angular/core';
import { Users } from '../datasource/models/Users';
import { trigger } from '@angular/animations';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getUser(key: string): Users | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  saveUser(key: string, value: Users): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeUser(key: string): void {
    localStorage.clear();
  }
}
