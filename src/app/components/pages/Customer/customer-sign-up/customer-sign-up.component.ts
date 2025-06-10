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
import { Router } from '@angular/router';
import { CustomerService } from '../../../../services/customer.service';
import { I18nService } from '../../../../i18n/i18n.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer-sign-up',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ToastModule,
    RouterLink,
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
    private authService: CustomerService,
    private messageService: MessageService,
    public i18nService: I18nService,
    private router: Router
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

        phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
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
        next: () => {
          this.form.reset();
          this.router.navigate(['/signin']);
        },
        error: () => {
          this.showError();
        },
      });
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  showError() {
    this.messageService.add({
      severity: 'error',
      summary: this.i18nService.t('messageServicetranslate.error'),
      detail: this.i18nService.t('messageServicetranslate.emialexist'),
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
