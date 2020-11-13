import {Injectable} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {URL} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
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
      email: new FormControl('', UserDataService.getValidatorsForEmail())
    });
  }

  public createPasswordForm(): FormGroup {
    return new FormGroup({
      oldPassword: new FormControl('', UserDataService.getValidatorsForPassword()),
      newPassword: new FormControl('', UserDataService.getValidatorsForPassword()),
    });
  }

  public mapFormBuilderToUser(form: FormGroup): User {

    return {
      name: form.get('firstname').value,
      surname: form.get('surname').value,
      email: form.get('email').value
    };
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


  public sendUserToModify(passenger) {
    // tu musisz wyslac do zmodyfikowania i obsluzyc
  }

  public changePassword(oldPassword: string, newPassword: string, id: string){
    return this.httpClient.put(URL + '/users/modifyPassword', {
        params: {
          id: id,
          newPassword: newPassword,
          oldPassword: oldPassword
        }
      }
    )
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
