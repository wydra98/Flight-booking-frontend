import {Component, OnInit} from '@angular/core';
import {SearchFlightFormBuilderService} from "./search-flight-form-builder.service";
import {FormGroup} from "@angular/forms";
import {BehaviorSubject, Subscription} from "rxjs";
import {SearchFlightService} from "../../services/search-flight.service";
import {OrderingService} from "../../services/ordering.service";
import {Router} from "@angular/router";
import {Type} from "./Type";

let typeColumn = [];

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent implements OnInit{
  public readonly title = 'Dokąd lecimy?';
  public readonly subtitle = 'Wypełnij formularz i znajdź idealną podróż';
  public types$ = new BehaviorSubject([]);
  public values: Array<string> = [];
  private subscriptions = new Subscription();
  public form: FormGroup;
  public minDate: Date;
  public minDateForDepartureDate: Date;
  private readonly MONTHS = {
    'Jan': '01',
    'Feb': '02',
    'Mar': '03',
    'Apr': '04',
    'May': '05',
    'Jun': '06',
    'Jul': '07',
    'Aug': '08',
    'Sep': '09',
    'Oct': '10',
    'Nov': '11',
    'Dec': '12'
  };

  constructor(
    private formBuilder: SearchFlightFormBuilderService,
    private router: Router,
    private searchFlightService: SearchFlightService,
    private orderingService: OrderingService
  ) {
  }

  ngOnInit() {
    this.orderingService.clearService();
    this.form = this.formBuilder.buildForm();
    this.fetchAirports();
    this.subscribeToBothWaysParameter();
    this.formBuilder.removeRequiredValidatorToArrivalDate(this.form);
    this.determineMinDate();
    this.subscribeToMinDateDeparture();
    this.createTypesList();
  }

  private fetchAirports(){
    console.log("hej")
    this.orderingService.fetchAirports().subscribe(
      (airports) => {
        typeColumn = []
        airports.forEach((airport) => { typeColumn.push(airport.city+', '+airport.country)})
      }
    )
    console.log("tutej bd tablica")
    console.log(typeColumn)
  }

  private determineMinDate(): void {
    const todayDate = new Date();
    this.minDate = new Date(todayDate);
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

  private parseDateDeparture(date: string): Date {
    let [weekDay, month, day, year] = date.toString().split(' ');
    month = this.MONTHS[month];
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }

  private subscribeToBothWaysParameter(): void {
    this.subscriptions.add(this.form.controls['checkBox'].valueChanges.subscribe(
      (response: string) => {
        if (response == "bothWay") {
          this.formBuilder.addRequiredValidatorToArrivalDate(this.form);
        } else {
          this.formBuilder.removeRequiredValidatorToArrivalDate(this.form);
          this.form.controls['arrivalDate'].setValue('')
        }

      }
    ));
  }

  private subscribeToMinDateDeparture(): void {
    this.subscriptions.add(this.form.controls.departureDate.valueChanges.subscribe(
      () => {
        console.log(this.form.controls['checkBox'].value)
        if (this.form.controls.departureDate.value > this.form.controls.arrivalDate.value) {
          this.form.controls['arrivalDate'].setValue(this.parseDateDeparture(this.form.controls.departureDate.value))
        }
        if(this.form.controls['checkBox'].value != "bothWay"){
          this.form.controls['arrivalDate'].setValue('')
        }
        this.minDateForDepartureDate = this.parseDateDeparture(this.form.controls.departureDate.value);
      }
    ));
  }

  public onSubmit(): void {
    this.router.navigate(['/flights']);
    this.searchFlightService.fetchAvailableFlights(this.formBuilder.mapFormGroupToParams(this.form))
  }
}


