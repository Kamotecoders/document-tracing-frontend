import { Component, OnInit } from '@angular/core';
import { UserType, Users } from './datasource/models/Users';
import { Router } from '@angular/router';
import { LocalStorageService } from './services/local-storage.service';
import { AuthService } from './services/auth.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'document-tracing-frontend';
  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((data: User | null) => {
      if (data != null) {
        this.getInfo(data.uid);
      }
    });
  }

  getInfo(uid: string) {
    this.authService.getUser(uid).then((result) => {
      if (result.exists()) {
        let users: Users = result.data();
        this.authService.setUsers(users);
        if (users.type === UserType.ADMIN) {
          this.router.navigate(['admin']);
        } else if (users.type === UserType.USER) {
          this.router.navigate(['client']);
        } else {
          this.authService.logout();
          this.router.navigate(['']);
        }
      }
    });
  }
}
