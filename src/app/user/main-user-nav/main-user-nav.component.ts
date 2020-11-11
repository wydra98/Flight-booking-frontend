import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, shareReplay} from "rxjs/operators";
import {Router} from "@angular/router";
import {AuthorizationService} from "../../auth/authorization.service";
import {SnackBarComponent} from "../../snack-bar/snack-bar.component";
import {DialogService} from "../../services/dialog.service";

@Component({
  selector: 'app-main-user-nav',
  templateUrl: './main-user-nav.component.html',
  styleUrls: ['./main-user-nav.component.css']
})
export class MainUserNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private router: Router,
              private breakpointObserver: BreakpointObserver,
              private auth: AuthorizationService,
              private snackbar: SnackBarComponent,
              private dialogService: DialogService) {
  }

  logout() {
    this.dialogService.openConfirmDialog('Czy na pewno chcesz się wylogować?')
      .afterClosed().subscribe(res => {
      if (res) {
        this.router.navigate(['/logIn']);
        this.snackbar.showSnackbar('Pomyślnie wylogowano', 'success');
        this.auth.logout();
      }
    })
  }
}
