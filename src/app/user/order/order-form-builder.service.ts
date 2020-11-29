import {Passenger} from '../../models/passenger';
import {Injectable} from '@angular/core';
import {FormArray, FormControl, Validators, FormGroup, ValidatorFn} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class OrderFormBuilderService {
  private readonly MONTHS = {
    'Jan': '01',
    'Feb': '02',
    'Mar': '03',
    'Apr': '04',
    'May': '05',
    'Jun': '06',
    'Jul': '07',
    'Aug': '08',
    'Sep': '09',
    'Oct': '10',
    'Nov': '11',
    'Dec': '12'
  };

  constructor() {
  }

  public createPassengerForm(passengerNumber: number): FormArray {
    const form = new FormArray([]);
    for (let i = 0; i < passengerNumber; i++) {
      form.push(new FormGroup({
        firstname: new FormControl('', OrderFormBuilderService.getValidatorsForName()),
        surname: new FormControl('', OrderFormBuilderService.getValidatorsForName()),
        documentId: new FormControl('', OrderFormBuilderService.getValidatorsForId()),
        phoneNumber: new FormControl('', OrderFormBuilderService.getValidatorsForPhoneNumber()),
        pesel: new FormControl('', OrderFormBuilderService.getValidatorsForPesel()),
        email: new FormControl('', OrderFormBuilderService.getValidatorsForEmail())
      }));
    }

    return form;
  }

  public checkIfPeselDuplicateExists(form: FormArray): boolean {
    const pesel: string[] = [];
    for (let i = 0; i < form.length; i++) {
      pesel.push(form.at(i).get('pesel').value);
    }

    return (new Set(pesel)).size !== pesel.length;

  }

  public mapFormArrayToPassengers(form: FormArray): Passenger[] {
    const passengers: Passenger[] = [];
    for (let i = 0; i < form.length; i++) {
      passengers.push({
        firstName: form.at(i).get('firstname').value,
        surname: form.at(i).get('surname').value,
        documentId: form.at(i).get('documentId').value,
        pesel: form.at(i).get('pesel').value,
        phoneNumber: form.at(i).get('phoneNumber').value,
        email: form.at(i).get('email').value ? form.at(i).get('email').value : null
      });
    }
    return passengers;
  }

  public getMaxDateForBirthDate(): Date {
    const date = new Date();
    return new Date(date.getFullYear() - 2, date.getMonth(), date.getDay());
  }

  private static getValidatorsForEmail() {
    return [Validators.required, Validators.email];
  }

  private static getValidatorsForPesel() {
    return [Validators.required];
  }

  private static getValidatorsForName(): Array<ValidatorFn> {
    return [Validators.required, Validators.minLength(2), Validators.pattern(/[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/)];
  }

  private static getValidatorsForId(): Array<ValidatorFn> {
    return [Validators.required, Validators.maxLength(6),
      Validators.minLength(6), Validators.pattern(/[0-9A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/)];
  }

  private static getValidatorsForPhoneNumber(): Array<ValidatorFn> {
    return [Validators.required, Validators.maxLength(9), Validators.minLength(9)];
  }
}
