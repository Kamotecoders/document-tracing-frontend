import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Users } from 'src/app/datasource/models/Users';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css'],
})
export class ClientHomeComponent {
  user: Users | null;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private localStorageService: LocalStorageService
  ) {
    this.user = localStorageService.getUser('users');
  }
  navigateTo(link: string) {
    console.log(this.user);
    if (this.user !== null) {
      this.router.navigate(['client/' + link, this.user.id]);
    } else {
      this.toastr.warning('User not found!', 'Warning!');
    }
  }
}
