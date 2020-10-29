// import { environment, URL } from '../../environments/environment';
// import { Observable, of } from 'rxjs';
// import { Airport } from 'src/app/models/airport';
 import { Injectable } from '@angular/core';
// import { delay } from 'rxjs/operators';
// import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AirportService {
  //
  // private airports: Airport[];
  //
  // constructor(
  //   private httpClient: HttpClient,
  //   private errorService: ErrorService
  // ) {
  //   this.fetchAirports();
  // }
  //
  // public getAirports(): Airport[] {
  //   return this.airports;
  // }
  //
  // public getAirportsStartingWith(expression: string): Observable<Airport[]> {
  //   return of(this.airports.filter(this.filterAirportsBy(expression))).pipe(delay(300));
  // }
  //
  // private filterAirportsBy(expression: string): (value: Airport, index: number, array: Airport[]) => boolean {
  //   return (airport: Airport) => {
  //     expression = expression.toUpperCase();
  //     return airport.city.toUpperCase().includes(expression)
  //       || airport.country.toUpperCase().includes(expression)
  //       || airport.name.toUpperCase().includes(expression);
  //   };
  // }
  //
  // private fetchAirports(): void {
  //   this.httpClient.get<Airport[]>(URL + '/airports', { headers: {
  //       'Content-Type': 'application/json'
  //     }}).subscribe(
  //     this.onSuccess(),
  //     this.onError()
  //   )
  // }
  //
  // private onError(): (error: any) => void {
  //   return (error: any) => { this.errorService.handleError(error); };
  // }
  //
  // private onSuccess(): (value: Airport[]) => void {
  //   return (airports: Airport[]) => { this.airports = airports; };
  // }
}
