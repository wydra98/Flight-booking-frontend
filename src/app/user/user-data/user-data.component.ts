import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {UserDataService} from "./user-data.service";
import {OrderingService} from "../../services/ordering.service";
import {DialogService} from "../../services/dialog.service";
import {SnackBarComponent} from "../../snack-bar/snack-bar.component";
import {Router} from "@angular/router";
import {AuthorizationService} from "../../auth/authorization.service";

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  public passengerForm: FormGroup;
  public passwordForm: FormGroup;
  public maxDateForBirthDate: Date;

  constructor(private userService: UserDataService,
              private dialogService: DialogService,
              private snackbar: SnackBarComponent,
              private router: Router,
              private auth: AuthorizationService) {
  }

  ngOnInit(): void {
    this.passengerForm = this.userService.createUserForm();
    this.passwordForm = this.userService.createPasswordForm();
  }

  public onSubmit(): void {
    this.userService.sendUserToModify(
      this.userService.mapFormBuilderToUser(this.passengerForm)
    );
  }

  public onSubmitPassword() {
    this.dialogService.openConfirmDialog('Czy na pewno chcesz zmienić hasło?')
      .afterClosed().subscribe(res => {
      if (res) {
        this.userService.changePassword(this.passwordForm.get('oldPassword').value,
          this.passwordForm.get('newPassword').value, this.auth.getId()).subscribe(
          () => {
            this.snackbar.showSnackbar("Pomyślnie zmieniono hasło", 'success')
          },
          () => {
            this.snackbar.showSnackbar('Wystąpił błąd podczas zmiany hasła', 'fail');
          }
        )
      }
    })
  }

  public onSubmitDelete() {

    this.dialogService.openConfirmDialog('Czy na pewno chcesz usunąć konto?')
      .afterClosed().subscribe(res => {
      if (res) {
        this.userService.deleteAccount(this.auth.getId()).subscribe(
          () => {
            this.router.navigate(['logIn']);
            this.auth.logout();
            this.snackbar.showSnackbar("Pomyślnie usunięto konto", 'success')
          },
          () => {
            this.snackbar.showSnackbar('Wystąpił błąd podczas usuwania', 'fail');
          }
        )
      }
    })
  }
}
