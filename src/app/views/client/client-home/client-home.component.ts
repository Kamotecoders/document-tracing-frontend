import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Users } from 'src/app/datasource/models/Users';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css'],
})
export class ClientHomeComponent {
  users: Users | null;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authSerive: AuthService
  ) {
    this.users = null;
    authSerive.getCurrentUser().subscribe((data) => {
      if (data !== null) {
        authSerive.getUser(data.uid).then((data) => {
          this.users = data.data() ?? null;
          console.log(this.users);
        });
      }
    });
  }
  navigateTo(link: string) {
    const users = this.authSerive.getUsers();
    if (users !== null) {
      this.router.navigate(['client/' + link]);
    } else {
      this.toastr.warning('User not found!', 'Warning!');
    }
  }
}
