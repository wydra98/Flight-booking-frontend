import {Component, OnInit} from '@angular/core';
import {DialogService} from "../../../services/dialog.service";
import {SnackBarComponent} from "../../../snack-bar/snack-bar.component";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {FlightService} from "../flight.service";
import {Type} from "../../../user/search-flight/Type";
import {BehaviorSubject} from "rxjs";
import {Airport} from "../../../models/airport";
import {Airline} from "../../../models/airline";

let typeColumn = [];

@Component({
  selector: 'app-flight-add',
  templateUrl: './flight-add.component.html',
  styleUrls: ['./flight-add.component.css']
})
export class FlightAddComponent implements OnInit {

  public flightForm: FormGroup;
  public minDate: Date;
  public types$ = new BehaviorSubject([]);
  public values: Array<string> = [];
  public airports: Airport[];
  public airlines: Airline[];

  constructor(private flightService: FlightService,
              private dialogService: DialogService,
              private snackbar: SnackBarComponent,
              private router: Router) {
  }

  ngOnInit(): void {
    this.airports = this.flightService.getAirports();
    this.airlines = this.flightService.getAirlines();
    this.airports.forEach((airport) => { typeColumn.push(airport.city+', '+airport.country)});
    this.flightForm = this.flightService.createFlightRequestForm();
    this.determineMinDate();
    this.createTypesList();
  }

  changed(data, optI) {
    this.values[optI] = data;
    this.createTypesList();
  }

  private createTypesList() {
    let types = [];
    typeColumn.forEach((type) => {
      let selected = this.values.includes(type);
      types.push(new Type(type, !selected));
    });

    this.types$.next(types);
  }

  private determineMinDate(): void {
    const todayDate = new Date();
    this.minDate = new Date(todayDate);
  }

  public onSubmit() {
    this.dialogService.openConfirmDialog('Czy na pewno chcesz dodać lot?')
      .afterClosed().subscribe(res => {
      if (res) {
        this.flightService.addFlight(this.flightService.mapToFlightRequest(this.flightForm)).subscribe(
          () => {
            this.snackbar.showSnackbar("Pomyślnie dodano lot", 'success')
            this.router.navigate(['flight']);
          },
          (err) => {
            this.snackbar.showSnackbar(err.error, 'fail');
          }
        )
      }
    })
  }
}
