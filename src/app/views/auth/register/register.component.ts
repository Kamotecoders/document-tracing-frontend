import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registrationForm: FormGroup; // Declare the form group

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registrationForm = this.fb.group({
      fullname: ['', Validators.required],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      birthdate: ['', Validators.required],
      age: ['', Validators.required],
      status: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    // Initialize the form group and form controls
  }

  // Function to submit the form
  submitForm() {
    if (this.registrationForm.valid) {
      this.authService.register(this.registrationForm.value).subscribe({
        next: (v: any) => {
          alert(v['message']);
        },
        error: (errr: any) => {
          alert(errr['message']);
        },
        complete: () => this.registrationForm.reset(),
      });
    } else {
      // Handle form validation errors
    }
  }
}
