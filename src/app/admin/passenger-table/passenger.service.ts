import {Injectable} from '@angular/core';
import {URL} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Airline} from "../../models/airline";
import {Passenger} from "../../models/passenger";

@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  isLoading = new BehaviorSubject<number>(0);

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }


  getLoading(): Observable<number> {
    return this.isLoading.asObservable()
  }

  public fetchPassengers(): Observable<any> {
    return this.httpClient.get<Passenger[]>(URL + '/passengers/get')
  }

  public deletePassenger(id: number): Observable<any> {
    this.isLoading.next(1)
    return this.httpClient.delete(URL + '/passengers/delete', {
      params: {
        id: id.toString()
      }
    })
  }
}
