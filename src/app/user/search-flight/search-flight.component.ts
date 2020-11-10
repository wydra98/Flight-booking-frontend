import {AirportService} from '../../services/airport.service';
import {Component, OnInit} from '@angular/core';
import {SearchFlightFormBuilderService} from "./search-flight-form-builder.service";
import {FormGroup} from "@angular/forms";
import {BehaviorSubject, Subscription} from "rxjs";
import {SearchFlightService} from "../../services/search-flight.service";
import {OrderingService} from "../../services/ordering.service";
import {Router} from "@angular/router";
import {Type} from "./Type";

let typeColumn = ['Nowy Jork, USA', 'Chicago, USA', 'Warszawa, Polska', 'Pekin, Chiny', 'Berlin, Niemcy', 'Szanghaj, Chiny',
  'Toronto, Kanada', 'Sydney, Australia', 'Tokio, Japonia', 'Rio de Janeiro, Brazylia', 'Oslo, Norwegia',
  'Buenos Aires, Brazylia', 'Paryż, Francja', 'Londyn, Wielka Brytania', 'Los Angeles, Usa', 'Moskwa, Rosja',
  'Kair, Egipt', 'Kraków, Polska', 'Delhi, Indie', 'Kijów, Ukraina'];

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
  private subscriptions = new Subscription();
  public form: FormGroup;
  public minDate: Date;

  constructor(
    private formBuilder: SearchFlightFormBuilderService,
    private airportService: AirportService,
    private router: Router,
    private searchFlightService: SearchFlightService,
    private orderingService: OrderingService
  ) {}

  ngOnInit() {
    this.orderingService.clearService();
    this.form = this.formBuilder.buildForm();
    this.airportService.fetchAirports();
    this.subscribeToBothWaysParameter();
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
    this.subscriptions.add(this.form.controls['checkBox'].valueChanges.subscribe(
      (response: string) => {
        if(response == "bothWay")
          { this.formBuilder.addRequiredValidatorToArrivalDate(this.form); }
        else { this.formBuilder.removeRequiredValidatorToArrivalDate(this.form); }
      }
    ));
  }

  public onSubmit(): void {
    this.searchFlightService.fetchAvailableFlights(this.formBuilder.mapFormGroupToParams(this.form))
  }
}


