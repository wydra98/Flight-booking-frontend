import {Injectable} from '@angular/core';
import {URL} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable, BehaviorSubject} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private jwtHelper = new JwtHelperService();
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  private isAdminSubject = new BehaviorSubject<boolean>(this.isAdmin());

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

  saveName(name: string) {
    localStorage.removeItem('name');
    localStorage.setItem('name', name);
  }

  saveEmail(email: string) {
    localStorage.removeItem('email');
    localStorage.setItem('email', email);
  }

  saveSurname(surname: string) {
    localStorage.removeItem('surname');
    localStorage.setItem('surname', surname);
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

  getName() {
    return localStorage.getItem('name');
  }

  getEmail() {
    return localStorage.getItem('email');
  }

  getSurname() {
    return localStorage.getItem('surname');
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

  signIn(email: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);
    return this.http.post(URL + '/login', params)
      .pipe(tap((response: any) => {
        this.saveToken(response.token);
        this.saveRole(response.userDto.role);
        this.saveId(response.userDto.id);
        this.saveName(response.userDto.name);
        this.saveSurname(response.userDto.surname);
        this.saveEmail(response.userDto.email);
      }));
  }

  signUp(name: string, surname: string, email: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
      .set('name', name)
      .set('surname', surname)
      .set('password', password);
    return this.http.post(URL + '/register', params);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('surname');
    localStorage.removeItem('email');
    this.isLoggedInSubject.next(false);
    this.isAdminSubject.next(false);
  }

}
