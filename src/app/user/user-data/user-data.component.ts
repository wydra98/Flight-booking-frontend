import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {UserDataService} from "./user-data.service";
import {DialogService} from "../../services/dialog.service";
import {SnackBarComponent} from "../../snack-bar/snack-bar.component";
import {Router} from "@angular/router";
import {AuthorizationService} from "../../auth/authorization.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  public passengerForm: FormGroup;
  public maxDateForBirthDate: Date;
  name: string;
  surname: string;
  email: string;

  constructor(private userService: UserDataService,
              private dialogService: DialogService,
              private snackbar: SnackBarComponent,
              private router: Router,
              private auth: AuthorizationService) {
  }

  ngOnInit(): void {
    this.passengerForm = this.userService.createUserForm();
    this.name =this.auth.getName();
    this.surname =this.auth.getSurname();
    this.email =this.auth.getEmail();
  }

  public onSubmitUser() {
    this.dialogService.openConfirmDialog('Czy na pewno chcesz zmodyfikować dane?')
      .afterClosed().subscribe(res => {
      if (res) {
        this.userService.modifyUser(this.passengerForm.get('firstname').value,
                                    this.passengerForm.get('surname').value,
                                    this.passengerForm.get('email').value,
                                    this.passengerForm.get('password').value,
                                    this.auth.getId()).subscribe(
          (user: User) => {
            this.name = user.name;
            this.surname = user.surname;
            this.email = user.email;
            this.auth.saveName(user.name)
            this.snackbar.showSnackbar("Pomyślnie zmieniono dane", 'success')

          },
          (err) => {
            this.snackbar.showSnackbar(err.error, 'fail');
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
