import { Injectable } from '@angular/core';
import { Users } from '../datasource/models/Users';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  // Implement methods for reading, writing, updating, and deleting data in localStorage
  // For example:
  getUser(key: string): Users | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  saveUser(key: string, value: Users): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeUser(key: string): void {
    localStorage.removeItem(key);
  }
}
