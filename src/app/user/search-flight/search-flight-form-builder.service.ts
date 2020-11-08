import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AirportService} from "../../services/airport.service";
import {Airport} from "../../models/airport";
import {FlightRequestQueryParams} from "../../models/flight-request-query-params";


@Injectable({
  providedIn: 'root'
})
export class SearchFlightFormBuilderService {

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
    private airportService: AirportService) {
  }

  public buildForm(): FormGroup {
    return this.formBuilder.group({
      sourceLocation: ['', Validators.required],
      destinationLocation: ['', Validators.required],
      departureDate: ['', Validators.required],
      arrivalDate: [''],
      passengersNumber: [1, [Validators.required, Validators.max(10), Validators.min(1)]],
      changeLocation1: [''],
      changeLocation2: [''],
      checkBox: ['', Validators.required]
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
      departureDate: this.parseDate(form.controls['departureDate'].value),
      arrivalDate: form.controls['arrivalDate'].value ?
        this.parseDate(form.controls['arrivalDate'].value)
        : null,
      passengerNumber: form.controls['passengersNumber'].value,
      twoTrip: checkBoxValue
    };
  }

  private parseDate(date: string): string {
    let [weekDay, month, day, year] = date.toString().split(' ');
    month = this.MONTHS[month];
    return `${year}-${month}-${day}`;
  }

  private findAirportId(airportDn: string): number {
    return this.airportService.getAirports().find((airport: Airport) =>
      airport.city.toUpperCase().includes(airportDn.toUpperCase().split(',')[0])).id;
  }
}
