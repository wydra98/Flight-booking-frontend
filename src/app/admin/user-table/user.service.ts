import {Injectable} from '@angular/core';
import {URL} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoading = new BehaviorSubject<number>(0);

  constructor(private httpClient: HttpClient) {
  }

  getLoading(): Observable<number> {
    return this.isLoading.asObservable();
  }

  public fetchUsers(): Observable<any> {
    return this.httpClient.get<User[]>(URL + '/users/get');
  }

  public deleteUser(id: number): Observable<any> {
    this.isLoading.next(1);
    return this.httpClient.delete(URL + '/users/delete', {
      params: {
        id: id.toString()
      }
    });
  }
}
