import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css'],
})
export class AdminMainComponent {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}
  logout() {
    this.localStorageService.removeUser('users');
    this.router.navigate(['']);
  }
}
