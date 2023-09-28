import { Component, OnInit } from '@angular/core';
import { Users } from './datasource/models/Users';
import { Router } from '@angular/router';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'document-tracing-frontend';
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}
  ngOnInit(): void {
    const result = this.localStorageService.getUser('users');
    if (result) {
      if (result.type === 'admin') {
        this.router.navigate(['admin']);
      } else if (result.type === 'user') {
        this.router.navigate(['client']);
      } else {
        this.localStorageService.removeUser('users');
        console.log(result);
      }
    }
  }
}
