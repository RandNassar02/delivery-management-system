import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
// driver-login.component.ts
constructor(private authService: AuthService) {}

onLogin() {
  const { email, password } = this.loginForm.value;
  this.authService.login(email, password).subscribe(user => {
    console.log('تم تسجيل الدخول بنجاح!', user);
  });
}
