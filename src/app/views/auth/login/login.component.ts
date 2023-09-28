import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private localStorageService: LocalStorageService
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
          alert('Successfully Logged in..');
          this.router.navigate(['admin']);
        } else if (v.type === 'user') {
          alert('Successfully Logged in..');
          this.router.navigate(['client']);
        } else {
          alert('User not found..');
        }
      },
      error: (e) => alert(e.message),
    });
  }
}
