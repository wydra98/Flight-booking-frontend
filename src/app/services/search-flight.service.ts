import {URL} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Trip} from "../models/trip";
import {HttpClient} from "@angular/common/http";
import {FlightRequestQueryParams} from "../models/flight-request-query-params";
import {Router} from "@angular/router";
import {SnackBarComponent} from "../snack-bar/snack-bar.component";

@Injectable({
  providedIn: 'root',
})
export class SearchFlightService {
  private tripsToDestination = new BehaviorSubject<Trip[]>([]);
  private tripsFromDestination = new BehaviorSubject<Trip[]>([]);
  public signal = new BehaviorSubject<boolean>(false);
  private passengersNumber: number;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private snackbar: SnackBarComponent) {
  }

  public fetchAvailableFlights(params: FlightRequestQueryParams): void {
    this.passengersNumber = params.passengerNumber;

    this.httpClient.get<[Trip[], Trip[]]>(URL + '/trips/findTrips', this.createHttpOptions(params))
      .subscribe(
        (trips: [Trip[], Trip[]]) => {
          this.tripsToDestination.next(trips[0]);
          this.tripsFromDestination.next(trips[1]);
          this.signal.next(true);
        },
        (err: any) => {
          this.snackbar.showSnackbar(err.error, 'fail');
        }
      );
  }

  public getPassengersNumber(): number {
    return this.passengersNumber;
  }

  public getFoundTripsToDestination(): Observable<Trip[]> {
    return this.tripsToDestination.asObservable();
  }

  public getFoundTripsFromDestination(): Observable<Trip[]> {
    return this.tripsFromDestination.asObservable();
  }

  public getSignal(): Observable<boolean> {
    return this.signal.asObservable();
  }

  private createHttpOptions(params: FlightRequestQueryParams): object {
    return {
      params,
      responseType: 'json',
    };
  }
}
