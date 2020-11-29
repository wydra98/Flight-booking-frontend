import {Injectable} from '@angular/core';
import {URL} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Passenger} from '../../models/passenger';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  isLoading = new BehaviorSubject<number>(0);

  constructor(private httpClient: HttpClient) {
  }

  getLoading(): Observable<number> {
    return this.isLoading.asObservable();
  }

  public fetchPassengers(): Observable<any> {
    return this.httpClient.get<Passenger[]>(URL + '/passengers/get');
  }

  public deletePassenger(id: number): Observable<any> {
    this.isLoading.next(1);
    return this.httpClient.delete(URL + '/passengers/delete', {
      params: {
        id: id.toString()
      }
    });
  }
}
