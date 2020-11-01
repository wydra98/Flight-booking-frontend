import {AirportService} from '../../services/airport.service';
import {Component, OnInit} from '@angular/core';
import {SearchFlightFormBuilderService} from "../../services/search-flight-form-builder.service";
import {FormGroup} from "@angular/forms";
import {async, Observable, of} from "rxjs";
import {Airport} from "../../models/airport";
import {SearchFlightService} from "../../services/search-flight.service";
import {OrderingService} from "../../services/ordering.service";
import {Router} from "@angular/router";
import {SnackBarComponent} from "../../snack-bar/snack-bar.component";
import {map} from "rxjs/operators";


@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent implements OnInit{
  public readonly title = 'Dokąd lecimy?';
  public readonly subtitle = 'Wypełnij formularz i znajdź idealną podróż';
  public form: FormGroup;
  public airports: Observable<Airport[]>;
  public minDate: Date;

  constructor(
    private formBuilder: SearchFlightFormBuilderService,
    private airportService: AirportService,
    private router: Router,
    private searchFlightService: SearchFlightService,
    private orderingService: OrderingService,
    private snackbar: SnackBarComponent
  ) {}

  ngOnInit() {
    this.orderingService.clearService();
    this.form = this.formBuilder.buildForm();
    this.fetchAirports()
    this.determineMinDate();
  }

  public fetchAirports(): void {
    this.airports = this.airportService.fetchAirports();
  }

  private determineMinDate(): void {
    const todayDate = new Date();
    this.minDate = new Date(todayDate);
  }

  public getAirports($event: any): void {

    const property = $event.target.getAttribute('formControlName');

    this.airports = of([])
    this.airports = this.airportService.fetchAirports()
      //.pipe(
       // map(this.formBuilder.disableOptionChosenInAnotherLocationField(property, this.form)));

  }


  public onSubmit(): void {
    this.searchFlightService.fetchAvailableFlights(this.formBuilder.mapFormGroupToParams(this.form));
    this.router.navigate(['/flights']);
   }
}


