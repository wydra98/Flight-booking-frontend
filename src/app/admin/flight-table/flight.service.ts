import {Injectable} from '@angular/core';
import {URL} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {Airport} from "../../models/airport";
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {FlightRequest, FlightResponse, FlightResponseWithDate} from "./flight-to-view";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  chosenFlightResponse = new BehaviorSubject<FlightResponse>(null);
  isLoading = new BehaviorSubject<number>(0);

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  getChosenFlight(): Observable<FlightResponse> {
    return this.chosenFlightResponse.asObservable()
  }

  getLoading(): Observable<number> {
    return this.isLoading.asObservable()
  }

  navigateToEdit(row) {
    this.chosenFlightResponse.next(row);
    this.router.navigate(['/flightEdit']);
  }

  toViewData(flightResponse: FlightResponse): FlightResponseWithDate {
    return{
      id: flightResponse.id,
      airlineName: flightResponse.airlineName,
      numberSeats: flightResponse.numberSeats,
      price: flightResponse.price,
      srcAirportName: flightResponse.srcAirportName,
      dstAirportName: flightResponse.dstAirportName,
      departureDate: flightResponse.departureDate,
      departureDateParse: this.parsedDate(flightResponse.departureDate),
      departureTime: flightResponse.departureTime,
      flightTime: flightResponse.flightTime,
    }
  }

  private parsedDate(date: string){
    let [year, month, day] = date.toString().split('-');
    return new Date(parseInt(year), parseInt(month), parseInt(day));
  }

  public createFlightRequestForm(): FormGroup {
    return new FormGroup({
      airlineId: new FormControl('', FlightService.getValidatorsForId()),
      srcAirportId: new FormControl('', FlightService.getValidatorsForId()),
      dstAirportId: new FormControl('', FlightService.getValidatorsForId()),
      numberSeats: new FormControl('', FlightService.getValidatorsForSeat()),
      price: new FormControl('', FlightService.getValidatorsForNumber()),

      departureDate: new FormControl('', Validators.required),
      departureTime: new FormControl('', Validators.required),
      flightTime: new FormControl('', Validators.required)
    });
  }

  public mapToFlightRequest(form: FormGroup): FlightRequest {
    return {
      airlineId: form.controls['airlineId'].value,
      numberSeats: form.controls['numberSeats'].value,
      price: form.controls['price'].value,
      srcAirportId: form.controls['srcAirportId'].value,
      dstAirportId: form.controls['dstAirportId'].value,
      departureDate: form.controls['departureDate'].value,
      departureTime: form.controls['departureTime'].value,
      flightTime: form.controls['flightTime'].value
    };
  }

  public mapToFlightRequestWithId(form: FormGroup, id: number): FlightRequest {
    return {
      id: id,
      airlineId: form.controls['airlineId'].value,
      numberSeats: form.controls['numberSeats'].value,
      price: form.controls['price'].value,
      srcAirportId: form.controls['srcAirportId'].value,
      dstAirportId: form.controls['dstAirportId'].value,
      departureDate: form.controls['departureDate'].value,
      departureTime: form.controls['departureTime'].value,
      flightTime: form.controls['flightTime'].value
    };
  }

  private static getValidatorsForId(): Array<ValidatorFn> {
    return [Validators.required, Validators.min(0)];
  }

  private static getValidatorsForSeat(): Array<ValidatorFn> {
    return [Validators.required, Validators.max(350), Validators.min(1)];
  }

  private static getValidatorsForNumber(): Array<ValidatorFn> {
    return [Validators.required, Validators.max(2000), Validators.min(1)];
  }

  public addFlight(flightRequest: FlightRequest): Observable<any> {
    return this.httpClient.post<FlightRequest[]>(URL + '/flights', flightRequest)
  }

  public fetchFlightResponse(): Observable<any> {
    return this.httpClient.get(URL + '/flights/get')
  }

  public deleteFlight(id: number): Observable<any> {
    this.isLoading.next(1)
    return this.httpClient.delete(URL + '/flights/delete', {
      params: {
        id: id.toString()
      }
    })
  }

  public editFlight(flightRequests: FlightRequest): Observable<any> {
    return this.httpClient.put(URL + '/flights', flightRequests);
  }
}
