import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import bcrypt from 'bcryptjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersUrl = 'http://localhost:3000/users';
  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  private hasToken(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined' &&
      !!localStorage.getItem('currentUser')
    );
  }

  login(email: string, password: string): Observable<User> {
    return this.http.get<User[]>(`${this.usersUrl}?email=${email}`).pipe(
      map((users) => {
        const user = users[0];

        if (user.userType === 'admin') {
          if (user.password !== password) {
            throw new Error('Invalid email or password');
          }
        } else {
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

        this.loggedInSubject.next(true);
        return user;
      }),
      catchError((err) => throwError(() => err))
    );
  }

  logout() {
    if (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    ) {
      localStorage.removeItem('currentUser');
    }
    this.loggedInSubject.next(false);
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  getUserType(): User | null {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    return user?.userType || null;
  }

  getUserID(): string | null {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    return user?.id || null;
  }
}
