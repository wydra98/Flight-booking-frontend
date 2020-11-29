import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Airport} from '../../models/airport';
import {FlightRequestQueryParams} from '../../models/flight-request-query-params';
import {OrderingService} from '../../services/ordering.service';


@Injectable({
  providedIn: 'root'
})
export class SearchFlightFormBuilderService {

  private airports: Airport[];

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
    private formBuilder: FormBuilder,
    private orderingService: OrderingService) {

    this.fetchAirports();
  }

  public buildForm(): FormGroup {
    return this.formBuilder.group({
      sourceLocation: ['', Validators.required],
      destinationLocation: ['', Validators.required],
      fromDeparture: ['', Validators.required],
      toDeparture: ['', Validators.required],
      toArrival: ['', Validators.required],
      fromArrival: ['', Validators.required],
      arrivalDate: [''],
      passengersNumber: [1, [Validators.required, Validators.max(10), Validators.min(1)]],
      maxChanges: [1, [Validators.required, Validators.max(3), Validators.min(1)]],
      maxTimeBetweenChanges: [6, [Validators.required, Validators.max(12), Validators.min(1)]],
      changeLocation1: [''],
      changeLocation2: [''],
      changeLocation3: [''],
      changeLocation4: [''],
      checkBox: ['', Validators.required],
      checkBoxChange: ['', Validators.required],
    });
  }

  public mapFormGroupToParams(form: FormGroup): FlightRequestQueryParams {
    let checkBoxValue = true;
    if (form.controls['checkBox'].value == 'oneWay') {
      checkBoxValue = false;
    }
    return {
      srcAirportId: this.findAirportId(form.controls['sourceLocation'].value),
      dstAirportId: this.findAirportId(form.controls['destinationLocation'].value),
      firstChangeId: form.controls['changeLocation1'].value ?
        this.findAirportId(form.controls['changeLocation1'].value) : null,
      secondChangeId: form.controls['changeLocation2'].value ?
        this.findAirportId(form.controls['changeLocation2'].value) : null,
      thirdChangeId: form.controls['changeLocation3'].value ?
        this.findAirportId(form.controls['changeLocation3'].value) : null,
      fourthChangeId: form.controls['changeLocation4'].value ?
        this.findAirportId(form.controls['changeLocation4'].value) : null,
      fromDeparture: this.parseDate(form.controls['fromDeparture'].value),
      toDeparture: this.parseDate(form.controls['toDeparture'].value),
      toArrival: form.controls['fromArrival'].value ? this.parseDate(form.controls['fromArrival'].value) : null,
      fromArrival: form.controls['toArrival'].value ? this.parseDate(form.controls['toArrival'].value) : null,
      passengerNumber: form.controls['passengersNumber'].value,
      maxChanges: form.controls['maxChanges'].value ? form.controls['maxChanges'].value : null,
      maxTimeBetweenChanges: form.controls['maxTimeBetweenChanges'].value ? form.controls['maxTimeBetweenChanges'].value : null,
      twoTrip: checkBoxValue
    };
  }

  public addRequiredValidatorToArrivalDate(form: FormGroup): void {
    form.controls.toArrival.enable();
    form.controls.toArrival.setValidators(Validators.required);
    form.controls.toArrival.updateValueAndValidity();
    form.controls.toArrival.enable();
    form.controls.toArrival.setValidators(Validators.required);
    form.controls.toArrival.updateValueAndValidity();
    form.controls.fromArrival.enable();
    form.controls.fromArrival.setValidators(Validators.required);
    form.controls.fromArrival.updateValueAndValidity();
    form.controls.fromArrival.enable();
    form.controls.fromArrival.setValidators(Validators.required);
    form.controls.fromArrival.updateValueAndValidity();
  }

  public removeRequiredValidatorToArrivalDate(form: FormGroup): void {
    form.controls.toArrival.disable();
    form.controls.toArrival.setValidators(null);
    form.controls.toArrival.updateValueAndValidity();
    form.controls.toArrival.enable();
    form.controls.toArrival.setValidators(null);
    form.controls.toArrival.updateValueAndValidity();
    form.controls.fromArrival.disable();
    form.controls.fromArrival.setValidators(null);
    form.controls.fromArrival.updateValueAndValidity();
    form.controls.fromArrival.enable();
    form.controls.fromArrival.setValidators(null);
    form.controls.fromArrival.updateValueAndValidity();
  }

  public addRequiredValidatorToMaxChanges(form: FormGroup): void {
    form.controls.maxChanges.enable();
    form.controls.maxChanges.setValue(1);
    form.controls.maxChanges.setValidators([Validators.required, Validators.max(3), Validators.min(1)]);
    form.controls.maxChanges.updateValueAndValidity();
  }

  public addRequiredValidatorToTimeBetweenChanges(form: FormGroup): void {
    form.controls.maxTimeBetweenChanges.enable();
    form.controls.maxTimeBetweenChanges.setValue(6);
    form.controls.maxTimeBetweenChanges.setValidators([Validators.required, Validators.max(12), Validators.min(1)]);
    form.controls.maxTimeBetweenChanges.updateValueAndValidity();
  }

  public removeRequiredValidatorToMaxChanges(form: FormGroup): void {
    form.controls.maxChanges.disable();
    form.controls.maxChanges.reset();
    form.controls.maxChanges.setValidators(null);
    form.controls.maxChanges.updateValueAndValidity();
  }

  public removeRequiredValidatorToTimeBetweenChanges(form: FormGroup): void {
    form.controls.maxTimeBetweenChanges.disable();
    form.controls.maxTimeBetweenChanges.reset();
    form.controls.maxTimeBetweenChanges.setValidators(null);
    form.controls.maxTimeBetweenChanges.updateValueAndValidity();
  }

  private parseDate(date: string): string {
    let [weekDay, month, day, year] = date.toString().split(' ');
    month = this.MONTHS[month];
    return `${year}-${month}-${day}`;
  }

  private fetchAirports() {
    this.orderingService.fetchAirports().subscribe(
      (airports) => {
        this.airports = airports;
      });
  }

  private findAirportId(airportDn: string): number {

    return this.airports.find((airport: Airport) => airport.city.toUpperCase().includes(airportDn.toUpperCase().split(',')[0])).id;
  }
}
