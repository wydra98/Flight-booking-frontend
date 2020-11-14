import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Airport} from "../../../models/airport";
import {DialogService} from "../../../services/dialog.service";
import {SnackBarComponent} from "../../../snack-bar/snack-bar.component";
import {Router} from "@angular/router";
import {AirlineService} from "../airline.service";
import {Airline} from "../../../models/airline";

@Component({
  selector: 'app-airline-edit',
  templateUrl: './airline-edit.component.html',
  styleUrls: ['./airline-edit.component.css']
})
export class AirlineEditComponent implements OnInit {

  public airlineForm: FormGroup;
  chosenAirline: Airline;

  constructor(private airlineService: AirlineService,
              private dialogService: DialogService,
              private snackbar: SnackBarComponent,
              private router: Router) {
  }

  ngOnInit(): void {
    this.fetchAirline();
    this.airlineForm = this.airlineService.createAirlineForm();
  }

  private fetchAirline() {
    this.airlineService.getChosenAirline().subscribe(
      (airline: Airline) => {
        this.chosenAirline = airline
      }
    )
    this.airlineForm = this.airlineService.createAirlineForm();
  }

  public onSubmit() {
    this.dialogService.openConfirmDialog('Czy na pewno chcesz zmodyfikować linię lotniczą?')
      .afterClosed().subscribe(res => {
      if (res) {
        this.airlineService.editAirline(this.airlineService.mapToAirlineWithId(this.airlineForm,this.chosenAirline.id)).subscribe(
          () => {
            this.snackbar.showSnackbar("Pomyślnie zmodyfikowano linię lotniczą", 'success')
            this.router.navigate(['airline']);
          },
          (err) => {
            this.snackbar.showSnackbar(err.error, 'fail');
          }
        )
      }
    })
  }

}
