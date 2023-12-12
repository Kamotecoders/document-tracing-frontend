import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserType, Users } from 'src/app/datasource/models/Users';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registrationForm: FormGroup; // Declare the form group

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
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

  submitForm() {
    if (this.registrationForm.valid) {
      // Extract form values
      const newUser: Users = {
        fullname: this.registrationForm.get('fullname')?.value,
        address: this.registrationForm.get('address')?.value,
        gender: this.registrationForm.get('gender')?.value,
        birthdate: this.registrationForm.get('birthdate')?.value,
        age: this.registrationForm.get('age')?.value,
        status: this.registrationForm.get('status')?.value,
        phone: this.registrationForm.get('phone')?.value.toString(),
        email: this.registrationForm.get('email')?.value,
        id: '',
        type: UserType.USER,
      };
      const password = this.registrationForm.get('password')?.value ?? '';

      this.authService.register(newUser.email, password, newUser).then(
        (response) => {
          // Show a success message
          this.toastr.success('Registration successful', 'Success');
          // You can also redirect to a login page or handle navigation as needed
        },
        (error) => {
          // Handle registration error
          console.error('Registration error:', error);
          // Show an error message
          this.toastr.error('Registration failed', 'Error');
        }
      );
    } else {
      // Show a warning message if the form is not valid
      this.toastr.warning('Please fill out the form correctly', 'Warning');
    }
  }
}
