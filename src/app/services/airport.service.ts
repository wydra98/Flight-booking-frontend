import { URL } from '../../environments/environment';
import { Injectable } from '@angular/core';
import {Airport} from "../models/airport";
import {HttpClient} from "@angular/common/http";
import {Observable, of, Subscription} from "rxjs";
import {SnackBarComponent} from "../snack-bar/snack-bar.component";

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  airports: Airport[]

  constructor(
    private httpClient: HttpClient,
  ) {}

  public getAirports(): Airport[] {
    return this.airports;
  }

  public fetchAirports(): Observable<Airport[]> {
   this.fillAirports()
   return this.httpClient.get<Airport[]>(URL + '/airports')
  }

  private fillAirports(): void {
    this.httpClient.get<Airport[]>(URL + '/airports')
      .subscribe(
      this.onSuccess()
    )
  }

  private onSuccess(): (value: Airport[]) => void {
    return (airports: Airport[]) => { this.airports = airports; };
  }
}
