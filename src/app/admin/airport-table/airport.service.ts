import {Injectable} from '@angular/core';
import {URL} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {Airport} from "../../models/airport";
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {FlightRequestQueryParams} from "../../models/flight-request-query-params";

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  chosenAirport = new BehaviorSubject<Airport>(null);
  isLoading = new BehaviorSubject<number>(0);

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  getLoading(): Observable<number> {
    return this.isLoading.asObservable()
  }

  navigateToEdit(row) {
    this.chosenAirport.next(row);
    this.router.navigate(['/airportEdit']);
  }

  public fetchAirports(): Observable<any> {
    return this.httpClient.get<Airport[]>(URL + '/airports/get')
  }

  public createAirportForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', AirportService.getValidatorsForWord()),
      city: new FormControl('', AirportService.getValidatorsForWord()),
      country: new FormControl('', AirportService.getValidatorsForWord()),
      timezone: new FormControl('', AirportService.getValidatorsForTimezone()),
      latitude: new FormControl('', AirportService.getValidatorsForNumber()),
      longitude: new FormControl('', AirportService.getValidatorsForNumber()),
    });
  }

  public mapToAirport(form: FormGroup): Airport {
    return {
      name: form.controls['name'].value,
      city: form.controls['city'].value,
      country: form.controls['country'].value,
      timezone: form.controls['timezone'].value,
      latitude: form.controls['latitude'].value,
      longitude: form.controls['longitude'].value,
    };
  }

  private static getValidatorsForWord(): Array<ValidatorFn> {
    return [Validators.required, Validators.minLength(2), Validators.pattern(/[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/)];
  }

  private static getValidatorsForTimezone(): Array<ValidatorFn> {
    return [Validators.required, Validators.max(12), Validators.min(-12)];
  }

  private static getValidatorsForNumber(): Array<ValidatorFn> {
    return [Validators.required, Validators.pattern(/^\-?\d+((\.)\d+)?$/)];
  }

  public addAirport(airport: Airport): Observable<any>{
    return this.httpClient.post<Airport[]>(URL + '/airports', airport)
  }

  public deleteAirport(id: number): Observable<any> {
    this.isLoading.next(1)
    return this.httpClient.delete(URL + '/airports/delete', {
      params: {
        id: id.toString()
      }
    })
  }
}
