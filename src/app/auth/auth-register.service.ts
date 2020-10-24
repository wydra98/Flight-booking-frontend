import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root',
})
export class AuthRegisterGuardService implements CanActivate {
  constructor(private auth: AuthorizationService, public router: Router) {}

  // if user isn't logged in we navigate him to LogIn page
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['signUp']);
      this.auth.logout(); // nie ma tokena zwroci false
    } else {
      if (this.auth.isAdmin()){
        this.router.navigate(['admin']);
      }
      else{
        this.router.navigate(['user']);
      }
    }
    return false;
  }
}
