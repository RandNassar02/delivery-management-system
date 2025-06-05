import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DriverService } from '../../../../services/driver.service';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-driver-signup',
  imports: [CommonModule, ReactiveFormsModule, ToastModule, RouterLink],
  templateUrl: './driver-signup.component.html',
  styleUrl: './driver-signup.component.scss',
  providers: [MessageService],
})
export class DriverSignupComponent {
  formDriverSignup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private driverService: DriverService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.formDriverSignup = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$/),
          ],
        ],
        confirmPassword: ['', Validators.required],
        vehicleType: ['', Validators.required],
        modelName: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(group: AbstractControl) {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.formDriverSignup.invalid) return;

    this.driverService.sigUpDriver(this.formDriverSignup.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Driver account created successfully.',
        });
        this.formDriverSignup.reset();
      },
      error: (err) => {
        if (err.message === 'Email already exists') {
          this.messageService.add({
            severity: 'warn',
            summary: 'Email Exists',
            detail: 'This email is already in use.',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred during account creation.',
          });
        }
      },
    });
  }
}
