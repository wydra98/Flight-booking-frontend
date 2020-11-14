import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-airport-edit',
  templateUrl: './airport-edit.component.html',
  styleUrls: ['./airport-edit.component.css']
})
export class AirportEditComponent implements OnInit {

  // public airportForm: FormGroup;
  // name: string;
  // surname: string;
  // email: string;
  //
  // constructor(private airportService: AirportService,
  //             private dialogService: DialogService,
  //             private snackbar: SnackBarComponent,
  //             private router: Router) { }
  //
   ngOnInit(): void {
  //     this.airportForm = this.airportService.createAirportForm();
  //     this.airportService.getChosenUser()
  //     this.name =this.auth.getName()
  //     this.surname =this.auth.getSurname()
  //     this.email =this.auth.getEmail()
  }
  //
  // public onSubmitUser() {
  //   this.dialogService.openConfirmDialog('Czy na pewno chcesz zmodyfikować dane?')
  //     .afterClosed().subscribe(res => {
  //     if (res) {
  //       this.userService.modifyUser(this.passengerForm.get('firstname').value,
  //         this.passengerForm.get('surname').value,
  //         this.passengerForm.get('email').value,
  //         this.passengerForm.get('password').value,
  //         this.auth.getId()).subscribe(
  //         (user: User) => {
  //           this.name = user.name;
  //           this.surname = user.surname;
  //           this.email = user.email;
  //           this.auth.saveName(user.name)
  //           this.snackbar.showSnackbar("Pomyślnie zmieniono dane", 'success')
  //
  //         },
  //         (err) => {
  //           this.snackbar.showSnackbar(err.error, 'fail');
  //         }
  //       )
  //     }
  //   })
  // }
}
