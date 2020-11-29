import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Airport} from '../../../models/airport';
import {DialogService} from '../../../services/dialog.service';
import {SnackBarComponent} from '../../../snack-bar/snack-bar.component';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {Airline} from '../../../models/airline';
import {FlightService} from '../flight.service';
import {Type} from '../../../user/search-flight/Type';
import {FlightResponse} from '../flight-to-view';

let typeColumn = [];

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.css']
})
export class FlightEditComponent implements OnInit {

  public chosenFlight: FlightResponse;
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
    this.airlines = [];
    this.airports = [];
    this.fetchFlight();
    this.airports = this.flightService.getAirports();
    this.airlines = this.flightService.getAirlines();
    this.airports.forEach((airport) => {
      typeColumn.push(airport.city + ', ' + airport.country);
    });
    this.determineMinDate();
    this.createTypesList();
  }

  private fetchFlight() {
    this.flightService.getChosenFlight().subscribe(
      (flight: FlightResponse) => {
        this.chosenFlight = flight;
      }
    );
    this.flightForm = this.flightService.createFlightRequestForm();
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
    this.dialogService.openConfirmDialog('Czy na pewno chcesz zmodyfikować lot?')
      .afterClosed().subscribe(res => {
      if (res) {
        this.flightService.editFlight(this.flightService.mapToFlightRequestWithId(this.flightForm, this.chosenFlight.id)).subscribe(
          () => {
            this.snackbar.showSnackbar('Pomyślnie zmodyfikowano lot', 'success');
            this.router.navigate(['flight']);
          },
          (err) => {
            this.snackbar.showSnackbar(err.error, 'fail');
          }
        );
      }
    });
  }
}
