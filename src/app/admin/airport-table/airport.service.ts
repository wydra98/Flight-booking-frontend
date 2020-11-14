import {Injectable} from '@angular/core';
import {URL} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {Airport} from "../../models/airport";

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

  public deleteAirport(id: number): Observable<any> {
    this.isLoading.next(1)
    return this.httpClient.delete(URL + '/airports/delete', {
      params: {
        id: id.toString()
      }
    })
  }
}
