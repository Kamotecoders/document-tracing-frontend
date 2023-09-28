import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-client-main',
  templateUrl: './client-main.component.html',
  styleUrls: ['./client-main.component.css'],
})
export class ClientMainComponent {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}
  logout() {
    this.localStorageService.removeUser('users');
    this.router.navigate(['']);
  }
}
