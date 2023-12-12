import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Users } from 'src/app/datasource/models/Users';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

import { environment } from 'src/environments/environment.development';
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

  forgotPassword() {
    let email: string | null = this.loginForm.get('email')?.value ?? null;
    if (email != null) {
      this.authService
        .forgotPassword(email)
        .then((data) => {
          this.toastr.success(`an email sent to : ${email}`);
        })
        .catch((err) => {
          this.toastr.error(err);
        });
    } else {
      this.toastr.error('Enter Email');
    }
  }
  onLogin() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService
      .login(email ?? '', password ?? '')
      .then((response) => {
        // this.router.navigate(['/dashboard']);
        this.router.navigate(['']);
        this.toastr.success('Login successful', 'Success');
      })
      .catch((error) => {
        // Handle login error
        console.error('Login error:', error);

        this.toastr.error(error);
      });
  }
}
