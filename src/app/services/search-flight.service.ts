import { environment, URL } from '../../environments/environment';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Trip} from "../models/trip";
import {HttpClient, HttpParams} from "@angular/common/http";
import {FlightRequestQueryParams} from "../models/flight-request-query-params";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackBarComponent} from "../snack-bar/snack-bar.component";

enum FlightDirection {
  TO_DESTINATION = 0,
  FROM_DESTINATION = 1
};

@Injectable({
  providedIn: 'root',
})
export class SearchFlightService {
  private tripsToDestination = new BehaviorSubject<Trip[]>([]);
  private tripsFromDestination = new BehaviorSubject<Trip[]>([]);
  private passengersNumber: number;

  constructor(
    private httpClient: HttpClient,
    private snackbar: SnackBarComponent) {}

  private readonly FLIGHTS_URL = URL + '/trips/findTrips';

  public fetchAvailableFlights(params: FlightRequestQueryParams): void {
    this.passengersNumber = params.passengerNumber;

    this.httpClient.get<[Trip[], Trip[]]>(this.FLIGHTS_URL, this.createHttpOptions(params))
      .subscribe(
        this.onTripsReceived(),
        this.handleFetchTripError()
      );
  }

  public getPassengersNumber(): number {
    return this.passengersNumber;
  }

  private handleFetchTripError(): (error: any) => void {
    return (error: any) => {this.snackbar.showSnackbar('Błąd odczytu danych', 'fail');};
  }

  public getFoundTripsToDestination(): Observable<Trip[]> {
    return this.tripsToDestination.asObservable();
  }

  public getFoundTripsFromDestination(): Observable<Trip[]> {
    return this.tripsFromDestination.asObservable();
  }

  private onTripsReceived(): (value: [Trip[], Trip[]]) => void {
    return (trips: [Trip[], Trip[]]) => {
      console.log('Received trips: ', trips);
      this.tripsToDestination.next(trips[FlightDirection.TO_DESTINATION]);
      this.tripsFromDestination.next(trips[FlightDirection.FROM_DESTINATION]);
    };
  }

  private createHttpOptions(params: FlightRequestQueryParams): object {
    return {
      params,
      responseType: 'json',
    };
  }
}
