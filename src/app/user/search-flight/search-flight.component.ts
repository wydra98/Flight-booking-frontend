// import { OrderingService } from 'src/app/services/ordering.service';
// import { SearchFlightService } from 'src/app/services/search-flight.service';
// import { Observable, of, Subscription } from 'rxjs';
// import { AirportService } from '../../services/airport.service';
// import { SearchFlightFormBuilderService } from '../../services/search-flight-form-builder.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {SearchFlightFormBuilderService} from "../../services/search-flight-form-builder.service";
import {FormGroup} from "@angular/forms";
// import { FormGroup } from '@angular/forms';
// import { Airport } from '../../models/airport';
// import { Router } from '@angular/router';
// import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent implements OnInit, OnDestroy {
   public readonly title = 'Dokąd teraz?';
   public readonly subtitle = 'Wypełnij formularz i znajdź idealną podróż';
   public form: FormGroup;
   public checkboxState = false;
  // public autocompleteOptions: Observable<Airport[]>;
  // public minDateForDepartureDate: Date;
  // public minDateForArrivalDate: Date;
  // private subscriptions = new Subscription();
  //
  // private readonly MONTHS = {
  //   'Jan': '01',
  //   'Feb': '02',
  //   'Mar': '03',
  //   'Apr': '04',
  //   'May': '05',
  //   'Jun': '06',
  //   'Jul': '07',
  //   'Aug': '08',
  //   'Sep': '09',
  //   'Oct': '10',
  //   'Nov': '11',
  //   'Dec': '12'
  // };
  //
   constructor(
     private formBuilder: SearchFlightFormBuilderService,
  //   private airportService: AirportService,
  //   private router: Router,
  //   private searchFlightService: SearchFlightService,
  //   private orderingService: OrderingService
    ) { }

   ngOnInit() {
  //   this.orderingService.clearService();
    this.form = this.formBuilder.buildForm();
  //   this.subscribeToBothWaysParameter();
  //   this.determineMinDateForDepartureDate();
   }
  //
   ngOnDestroy(): void {
  //   this.subscriptions.unsubscribe();
   }

   public changeState(){
      if(!this.checkboxState){
        this.checkboxState = true;
      }
      else
        this.checkboxState = false;
   }
  //
  // public determineMinDateForArrivalDate(): void {
  //   this.minDateForArrivalDate = this.parseDate(this.form.controls.departureDate.value);
  // }
  //
  // public getAutocompleteAirportsOptions($event: any): void {
  //   const property = $event.target.getAttribute('formControlName');
  //   if (this.shouldClearAutocomplete(property)) {
  //     this.clearAutocompleteOptions();
  //     return;
  //   }
  //
  //   this.autocompleteOptions = this.airportService.getAirportsStartingWith(this.form.controls[property].value)
  //     .pipe(
  //       map(this.formBuilder.disableOptionChosenInAnotherLocationField(property, this.form)));
  // }
  //
  // public onSubmit(): void {
  //   console.log(this.form.controls.departureDate.value);
  //   this.searchFlightService.fetchAvailableFlights(this.formBuilder.mapFormGroupToParams(this.form));
  //   this.router.navigate(['booking/flights']);
  // }
  //
  // public clearAutocompleteOptions(): void {
  //   this.autocompleteOptions = of([]);
  // }
  //
  // private shouldClearAutocomplete(property: string): boolean {
  //   return !this.form.controls[property].value;
  // }
  //
  // private subscribeToBothWaysParameter(): void {
  //   this.subscriptions.add(this.form.controls['bothWays'].valueChanges.subscribe(
  //     this.handleArrivalDateValidation()
  //   ));
  // }
  //
  // private determineMinDateForDepartureDate(): void {
  //   const todayDate = new Date();
  //   this.minDateForDepartureDate = new Date(todayDate);
  // }
  //
  // private parseDate(date: string): Date {
  //   let [ weekDay, month, day, year ] = date.toString().split(' ');
  //   month = this.MONTHS[month];
  //   return new Date(parseInt(year), parseInt(month), parseInt(day));
  // }
  //
  // private handleArrivalDateValidation(): (bothWays: boolean) => void {
  //   return (bothWays: boolean) => {
  //     if (bothWays) { this.formBuilder.addRequiredValidatorToArrivalDate(this.form); }
  //     else { this.formBuilder.removeRequiredValidatorToArrivalDate(this.form); }
  //   };
  // }
}
