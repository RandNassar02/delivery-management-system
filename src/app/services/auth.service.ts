import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import * as bcrypt from 'bcryptjs';
import { User, UserType } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User> {
    return this.http.get<User[]>(`${this.usersUrl}?email=${email}`).pipe(
      map((users) => {
        const user = users[0];

        if (user.userType === 'admin') {
          if (user.password !== password) {
            throw new Error('Invalid email or password');
          }
        } else {
          // باقي المستخدمين: نقارن باستخدام bcrypt
          if (!bcrypt.compareSync(password, user.password)) {
            throw new Error('Invalid email or password');
          }
        }

        if (
          typeof window !== 'undefined' &&
          typeof window.localStorage !== 'undefined'
        ) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }),
      catchError((err) => throwError(() => err))
    );
  }

  getUserType(): UserType | null {
    if (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    ) {
      const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
      return user?.userType || null;
    }
    return null;
  }

  isLoggedIn(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined' &&
      !!localStorage.getItem('currentUser')
    );
  }

  logout() {
    if (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    ) {
      localStorage.removeItem('currentUser');
    }
  }
}
