import {Injectable} from '@angular/core';
import {URL} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Airline} from "../../models/airline";
import {Passenger} from "../../models/passenger";
import {User} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoading = new BehaviorSubject<number>(0);

  constructor(private httpClient: HttpClient) {
  }

  getLoading(): Observable<number> {
    return this.isLoading.asObservable()
  }

  public fetchUsers(): Observable<any> {
    return this.httpClient.get<User[]>(URL + '/users/get')
  }

  public deleteUser(id: number): Observable<any> {
    this.isLoading.next(1)
    return this.httpClient.delete(URL + '/users/delete', {
      params: {
        id: id.toString()
      }
    })
  }
}
