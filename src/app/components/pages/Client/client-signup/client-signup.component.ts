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

@Component({
  selector: 'app-client-signup',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-signup.component.html',
  styleUrl: './client-signup.component.scss',
})
export class ClientSignupComponent {
  formClientSignup!: FormGroup;

  constructor(private fb: FormBuilder, private clientService: ClientService) {}

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
        phone: ['', [Validators.required]],
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
        alert('Client signed up successfully!');
        this.formClientSignup.reset();
      },
      error: (err) => {
        console.error(err);
        alert('Error during sign up.');
      },
    });
  }
}
