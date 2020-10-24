import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap, map} from 'rxjs/operators';
import {Observable, BehaviorSubject} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private jwtHelper = new JwtHelperService();
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  private isAdminSubject = new BehaviorSubject<boolean>(this.isAdmin());
  private localURL = "https://localhost:8080";

  constructor(private http: HttpClient) {
  }

  getIsAdmin(): Observable<boolean> {
    return this.isAdminSubject.asObservable();
  }

  saveToken(token: string) {
    localStorage.removeItem('token');
    localStorage.setItem('token', token);
    this.isLoggedInSubject.next(true);
  }

  saveRole(role: string) {
    localStorage.removeItem('role');
    localStorage.setItem('role', role);
    this.isAdminSubject.next(true);
  }

  saveId(id: number) {
    localStorage.removeItem('id');
    localStorage.setItem('id', String(id));
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getId() {
    return localStorage.getItem('id');
  }

  getUserRole() {
    return localStorage.getItem('role');
  }

  // signIn and logout:
  signIn(email: string, password: string): Observable<any> {
    return this.http.post(this.localURL + '/login', {email: email, password: password})
      .pipe(tap((response: any) => {
        this.saveToken(response.token);
        this.saveRole(response.userDto.role);
        this.saveId(response.userDto.id);
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
    return this.isAuthenticated() && this.getUserRole() === 'ROLE_ADMIN';
  }

  signUp(name: string, surname: string, email: string, phone: string, password: string): Observable<any> {
    const user = {
      nme: name,
      surname: surname,
      email: email,
      password: password
    };
    return this.http.post(this.localURL + '/register', user);
  }

}
