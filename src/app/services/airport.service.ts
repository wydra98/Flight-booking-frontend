import {URL} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {Airport} from "../models/airport";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  airports: Airport[]

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  public getAirports(): Airport[] {
    return this.airports;
  }

  public fetchAirports() {
    this.airports = [];
    this.fillAirports()
  }

  private fillAirports(): void {
    this.httpClient.get<Airport[]>(URL + '/airports')
      .subscribe(
        this.onSuccess()
      )
  }

  private onSuccess(): (value: Airport[]) => void {
    return (airports: any) => {
      console.log(airports[0])
      this.airports = airports;
    };
  }
}
