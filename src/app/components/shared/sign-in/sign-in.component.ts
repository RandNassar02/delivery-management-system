import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TranslatePipe } from '../../../i18n/translate.pipe';

@Component({
  selector: 'app-sign-in',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ToastModule,
    TranslatePipe,
    RouterLink,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  providers: [MessageService],
})
export class SignInComponent {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (user) => {
        switch (user.userType) {
          case 'admin':
            this.router.navigate(['/admin-dashboard']);
            break;
          case 'client':
            this.router.navigate(['/client-dashboard']);
            break;
          case 'customer':
            this.router.navigate(['/customer-dashboard']);
            break;
          case 'driver':
            this.router.navigate(['/driver-dashboard']);
            break;
          default:
            this.router.navigate(['/']);
            break;
        }
      },
      error: (err) =>
        this.messageService.add({
          severity: 'error',
          summary: 'error!',
          detail: 'Invalid email or password',
        }),
    });
  }
}
