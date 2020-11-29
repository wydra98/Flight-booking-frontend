import {Component, OnInit} from '@angular/core';
import {SearchFlightFormBuilderService} from './search-flight-form-builder.service';
import {FormGroup} from '@angular/forms';
import {BehaviorSubject, Subscription} from 'rxjs';
import {SearchFlightService} from '../../services/search-flight.service';
import {OrderingService} from '../../services/ordering.service';
import {Router} from '@angular/router';
import {Type} from './Type';
import {Airport} from '../../models/airport';

let typeColumn = [];

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent implements OnInit {
  public readonly title = 'Dokąd lecimy?';
  public readonly subtitle = 'Wypełnij formularz i znajdź idealną podróż';
  public types$ = new BehaviorSubject([]);
  public values: Array<string> = [];
  private subscriptionsWaysParameter = new Subscription();
  private subscriptionsChangesFlights = new Subscription();
  public form: FormGroup;
  public minDate: Date;
  public disableArrivalDate = false;
  public disableParameterChanges = false;
  public airports: Airport[];

  constructor(
    private formBuilder: SearchFlightFormBuilderService,
    private router: Router,
    private searchFlightService: SearchFlightService,
    private orderingService: OrderingService
  ) {
  }

  ngOnInit() {
    typeColumn = [];
    this.orderingService.clearService();
    this.airports = this.orderingService.getAirports();
    this.airports.forEach((airport) => {
      typeColumn.push(airport.city + ', ' + airport.country);
    });
    this.form = this.formBuilder.buildForm();
    this.subscribeToBothWaysParameter();
    this.subscribeToChangesFlights();
    this.formBuilder.removeRequiredValidatorToArrivalDate(this.form);
    this.determineMinDate();
    this.createTypesList();
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

  private subscribeToBothWaysParameter(): void {
    this.subscriptionsWaysParameter.add(this.form.controls['checkBox'].valueChanges.subscribe(
      (response: string) => {
        if (response == 'bothWay') {
          this.formBuilder.addRequiredValidatorToArrivalDate(this.form);
          this.disableArrivalDate = false;
        } else {
          this.formBuilder.removeRequiredValidatorToArrivalDate(this.form);
          this.form.controls['toArrival'].setValue('');
          this.form.controls['fromArrival'].setValue('');
          this.disableArrivalDate = true;
        }
      }
    ));
  }

  private subscribeToChangesFlights(): void {
    this.subscriptionsChangesFlights.add(this.form.controls['checkBoxChange'].valueChanges.subscribe(
      (response: string) => {
        if (response == 'change') {
          this.formBuilder.addRequiredValidatorToMaxChanges(this.form);
          this.formBuilder.addRequiredValidatorToTimeBetweenChanges(this.form);
          this.disableParameterChanges = true;
        } else {
          this.formBuilder.removeRequiredValidatorToMaxChanges(this.form);
          this.formBuilder.removeRequiredValidatorToTimeBetweenChanges(this.form);
          this.disableParameterChanges = false;
        }
      }
    ));
  }

  public onSubmit(): void {
    this.router.navigate(['/flights']);
    this.searchFlightService.fetchAvailableFlights(this.formBuilder.mapFormGroupToParams(this.form));
  }
}


