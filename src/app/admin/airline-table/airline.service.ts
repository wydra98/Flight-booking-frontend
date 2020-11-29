import {Injectable} from '@angular/core';
import {URL} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Airline} from '../../models/airline';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {

  chosenAirline = new BehaviorSubject<Airline>(null);
  isLoading = new BehaviorSubject<number>(0);

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  getChosenAirline(): Observable<Airline> {
    return this.chosenAirline.asObservable();
  }

  getLoading(): Observable<number> {
    return this.isLoading.asObservable();
  }

  navigateToEdit(row) {
    this.chosenAirline.next(row);
    this.router.navigate(['/airlineEdit']);
  }


  public createAirlineForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', AirlineService.getValidatorsForWord()),
      country: new FormControl('', AirlineService.getValidatorsForWord()),
    });
  }

  public mapToAirline(form: FormGroup): Airline {
    return {
      name: form.controls['name'].value,
      country: form.controls['country'].value,
    };
  }

  public mapToAirlineWithId(form: FormGroup, id: number): Airline {
    return {
      id: id,
      name: form.controls['name'].value,
      country: form.controls['country'].value,
    };
  }

  private static getValidatorsForWord(): Array<ValidatorFn> {
    return [Validators.required, Validators.minLength(2), Validators.pattern(/[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/)];
  }

  public addAirline(airline: Airline): Observable<any> {
    return this.httpClient.post<Airline[]>(URL + '/airlines', airline);
  }

  public fetchAirlines(): Observable<any> {
    return this.httpClient.get<Airline[]>(URL + '/airlines/get');
  }

  public deleteAirline(id: number): Observable<any> {
    this.isLoading.next(1);
    return this.httpClient.delete(URL + '/airlines/delete', {
      params: {
        id: id.toString()
      }
    });
  }

  public editAirline(airline: Airline): Observable<any> {
    return this.httpClient.put(URL + '/airlines', airline);
  }
}
