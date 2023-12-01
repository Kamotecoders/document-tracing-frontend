import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Users } from 'src/app/datasource/models/Users';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onLogin() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (v: Users) => {
        this.localStorageService.saveUser('users', v);
        if (v.type === 'admin') {
          this.toastr.success('Successfully Logged in..', 'Welcome admin!');
          this.router.navigate(['admin']);
        } else if (v.type === 'user') {
          this.toastr.success('Successfully Logged in..', 'Welcome client!');

          this.router.navigate(['client']);
        } else {
          this.toastr.warning('User not Found', 'Not Found!');
        }
      },
      error: (e) => this.toastr.warning(e.error.message, 'Not Found!'),
    });
  }
}
