import {Injectable} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {URL} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private httpClient: HttpClient) {
  }

  public createUserForm(): FormGroup {
    return new FormGroup({
      firstname: new FormControl('', UserDataService.getValidatorsForName()),
      surname: new FormControl('', UserDataService.getValidatorsForName()),
      email: new FormControl('', UserDataService.getValidatorsForEmail()),
      password: new FormControl('', UserDataService.getValidatorsForPassword()),
    });
  }


  private static getValidatorsForEmail() {
    return [Validators.required, Validators.email];
  }

  private static getValidatorsForName(): Array<ValidatorFn> {
    return [Validators.required, Validators.minLength(2), Validators.pattern(/[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/)];
  }

  private static getValidatorsForPassword(): Array<ValidatorFn> {
    return [Validators.required, Validators.minLength(2)];
  }


  public modifyUser(name: string, surname: string, email: string, password: string, id: string): Observable<any>{
    const params = new HttpParams()
      .set('id', id)
      .set('name', name)
      .set('surname', surname)
      .set('email', email)
      .set('newPassword', password)
    return this.httpClient.put(URL + '/users/modifyUser', params)
  }

  public deleteAccount(id: string): Observable<any> {
    return this.httpClient.delete(URL + '/users/delete', {
        params: {
          id: id
        }
      }
    )
  }
}
