import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, shareReplay} from "rxjs/operators";
import {Router} from "@angular/router";
import {AuthorizationService} from "../../auth/authorization.service";
import {SnackBarComponent} from "../../snack-bar/snack-bar.component";

@Component({
  selector: 'app-admin-main-nav',
  templateUrl: './admin-main-nav.component.html',
  styleUrls: ['./admin-main-nav.component.css']
})
export class AdminMainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private router: Router,
              private breakpointObserver: BreakpointObserver,
              private auth: AuthorizationService,
              private snackbar: SnackBarComponent) {
  }

  logout() {
    this.router.navigate(['/logIn']);
    this.snackbar.showSnackbar('Pomyślnie wylogowano', 'success');
    this.auth.logout();
  }

}
