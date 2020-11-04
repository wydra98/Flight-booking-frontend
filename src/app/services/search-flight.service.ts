import { URL } from '../../environments/environment';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Trip} from "../models/trip";
import {HttpClient} from "@angular/common/http";
import {FlightRequestQueryParams} from "../models/flight-request-query-params";

@Injectable({
  providedIn: 'root',
})
export class SearchFlightService {
  private tripsToDestination = new BehaviorSubject<Trip[]>([]);
  private tripsFromDestination = new BehaviorSubject<Trip[]>([]);
  private passengersNumber: number;

  constructor(
    private httpClient: HttpClient) {}

  public fetchAvailableFlights(params: FlightRequestQueryParams): void {
    this.passengersNumber = params.passengerNumber;

    this.httpClient.get<[Trip[], Trip[]]>(URL + '/trips/findTrips', this.createHttpOptions(params))
      .subscribe(
          this.onTripsReceived(),
          this.handleFetchTripError()
      );
  }

  public getPassengersNumber(): number {
    return this.passengersNumber;
  }

  private handleFetchTripError(): (error: any) => void {
    return (error: any) => { console.log('hej') };
  }


  public getFoundTripsToDestination(): Observable<Trip[]> {
    return this.tripsToDestination.asObservable();
  }

  public getFoundTripsFromDestination(): Observable<Trip[]> {
    return this.tripsFromDestination.asObservable();
  }

  private onTripsReceived(): (value: [Trip[], Trip[]]) => void {
    return (trips: [Trip[], Trip[]]) => {
      this.tripsToDestination.next(trips[0]);
      this.tripsFromDestination.next(trips[1]);
    };
  }

  private createHttpOptions(params: FlightRequestQueryParams): object {
    return {
      params,
      responseType: 'json',
    };
  }
}
