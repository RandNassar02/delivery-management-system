import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  // محاكاة تسجيل الدخول: عادة تُستبدل باستدعاء حقيقي لواجهة API
  login(email: string, password: string): boolean {
    // مثال فقط: يجب استبداله بمنطق تحقق فعلي
    if (email && password) {
      const mockUser = {
        id: '123',
        email: email,
        userType: 'driver', // يمكنك تغييره لاختبار أدوار مختلفة
        token: 'dummy-token'
      };
      localStorage.setItem('currentUser', JSON.stringify(mockUser));
      return true;
    }
    return false;
  }

  // استرجاع المستخدم الحالي من التخزين المحلي
  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  // التأكد إن كان المستخدم مسجلاً
  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }
}


