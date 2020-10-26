import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/auth/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userName = 'Lion';

  constructor(private router: Router, private auth: AuthorizationService) {
  //  this.setUserName();
  }

  // setUserName() {
  //   this.auth.getUser().subscribe((user: User) => {
  //     this.userName = user.name;
  //   });
  // }

  logout() {
    this.router.navigate(['/logIn']);
    this.auth.logout();
  }
}
