import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClientService } from '../../../../services/client.service';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../i18n/translate.pipe';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-client-signup',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
    TranslatePipe,
    RouterLink,
  ],
  templateUrl: './client-signup.component.html',
  styleUrl: './client-signup.component.scss',
  providers: [MessageService],
})
export class ClientSignupComponent {
  formClientSignup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formClientSignup = this.fb.group(
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
        confirmPassword: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        bankName: ['', [Validators.required]],
        bankAccount: ['', [Validators.required]],
        address: ['', [Validators.required]],
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
    if (this.formClientSignup.invalid) return;

    this.clientService.signUpClient(this.formClientSignup.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'sucsses',
          detail: 'creation account completed successfully',
        });
        this.router.navigate(['/signin']);
      },
      error: (err) => {
        if (err.message === 'This client name is already in use.') {
          this.messageService.add({
            severity: 'warn',
            summary: 'Name Exists',
            detail:
              'This client name is already in use. Please choose another.',
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

  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  showConfirmPassword: boolean = false;
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
