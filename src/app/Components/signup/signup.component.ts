import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {



  signupForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/) // Ensure only numbers and exactly 10 digits
    ])
  });

  // Submit form and validate password match
  onSubmit() {
    if (this.signupForm.valid) {
      if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      console.log('Form Submitted:', this.signupForm.value);
    } else {
      alert('Please fill in the form correctly');
    }
  }

  get f() {
    return this.signupForm.controls;
  }
}
