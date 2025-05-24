import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TranslatePipe } from '../../../../i18n/translate.pipe';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-customer-sign-up',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ToastModule,
  ],
  templateUrl: './customer-sign-up.component.html',
  styleUrl: './customer-sign-up.component.scss',
  providers: [MessageService],
})
export class CustomerSignUpComponent {
  form: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$/),
          ],
        ],
        confirmPassword: ['', [Validators.required]],

        phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        address: ['', [Validators.required, Validators.minLength(5)]],
      },
      {
        validators: passwordMatchValidator,
      }
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.signUpCustomer(this.form.value).subscribe({
        next: () => this.showSuccess(),
        error: () => this.showError(),
      });
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'sucsses',
      detail: 'Creation Account Completed Successfully',
    });
  }
  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'error!',
      detail: 'Error Please Try Again',
    });
  }
}
export function passwordMatchValidator(
  form: AbstractControl
): ValidationErrors | null {
  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordMismatch: true };
}
