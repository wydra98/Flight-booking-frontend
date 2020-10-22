import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private jwtHelper = new JwtHelperService();
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  private isAdminSubject = new BehaviorSubject<boolean>(this.isAdmin());

  constructor(private http: HttpClient) { }

  getIsLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  getIsAdmin(): Observable<boolean> {
    return this.isAdminSubject.asObservable();
  }

  // methods for deal with tokens:
  saveToken(token: string) {
    localStorage.removeItem('token');
    localStorage.setItem('token', token);
    this.isLoggedInSubject.next(true);
  }

  saveUserRole(userRole: string) {
    if (userRole === 'Admin') {
      this.isAdminSubject.next(true);
    }
    localStorage.setItem('userRole', userRole);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserRole() {
    return localStorage.getItem('userRole');
  }

  // signIn and logout:
  signIn(email: string, password: string): Observable<any> {
    return this.http.post(URL + '/api/user/auth', { email: email, password: password })
      .pipe(tap((response: any) => {
        this.saveToken(response.token);
        this.saveUserRole(response.user.roleName);
      }));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    this.isLoggedInSubject.next(false);
    this.isAdminSubject.next(false);
  }

  isAuthenticated(): boolean {
    if (this.getToken() == null) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(this.getToken());
  }

  isAdmin(): boolean {
    if (this.isAuthenticated() && this.getUserRole() === 'ROLE_ADMIN') {
      return true;
    }
    return false;
   }
  }
