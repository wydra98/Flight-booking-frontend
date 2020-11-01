import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AirportService} from "./airport.service";
import {Airport} from "../models/airport";
import {FlightRequestQueryParams} from "../models/flight-request-query-params";


@Injectable({
  providedIn: 'root'
})
export class SearchFlightFormBuilderService {


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

  constructor(
    private formBuilder: FormBuilder,
    private airportService: AirportService) {
  }

  public buildForm(): FormGroup {
    return this.formBuilder.group({
      sourceLocation: ['', Validators.required],
      destinationLocation: ['', Validators.required],
      departureDate: ['', Validators.required],
      arrivalDate: [''],
      passengersNumber: [1, [Validators.required, Validators.max(10), Validators.min(1)]],
      changeLocation1: [''],
      changeLocation2: [''],
      checkBox: ['', Validators.required]
    });
  }


  public mapFormGroupToParams(form: FormGroup): FlightRequestQueryParams {
    let checkBoxValue = true;
    console.log('checkBox ' + form.controls['checkBox'].value)
   if(form.controls['checkBox'].value == 'oneWay'){
     checkBoxValue = false;
   }



    return {
      srcAirportId: this.findAirportId(form.controls['sourceLocation'].value),
      dstAirportId: this.findAirportId(form.controls['destinationLocation'].value),
      departureDate: this.parseDate(form.controls['departureDate'].value),
      arrivalDate: form.controls['arrivalDate'].value ?
        this.parseDate(form.controls['arrivalDate'].value)
        : null,
      passengerNumber: form.controls['passengersNumber'].value,
      twoTrip: checkBoxValue
    };
  }

  private parseDate(date: string): string {
    let [ weekDay, month, day, year ] = date.toString().split(' ');
    month = this.MONTHS[month];
    return `${year}-${month}-${day}`;
  }


  // public disableOptionChosenInAnotherLocationField(property: string, form: FormGroup): (value: Airport[]) => Airport[] {
  //   return (airports: Airport[]): Airport[] => {
  //     console.log('airporstto disable   ' )
  //
  //     let airportIdToDisable = this.getAirportToDisable(property, form);
  //     if (airportIdToDisable.length == 0) {
  //       return;
  //     }
  //     console.log('airporstto disable   ' )
  //
  //
  //     let airports2 = airports.filter((airport: Airport) => {
  //       let flag = true;
  //       for (let airportsDis of airportIdToDisable){
  //         if(airportsDis == airport.id){
  //           flag = false
  //         }
  //       }
  //       return flag;
  //     })
  //
  //     console.log('airporst2' + airports2)
  //     return airports2
  //   }
  // }


  // private getAirportToDisable(property: string, form: FormGroup): number[] {
  //
  //   let arraysToDisable = [];
  //    console.log('property'+ property)
  //   switch (property) {
  //     case 'sourceLocation':
  //       if (form.controls['destinationLocation'].value != '') {
  //         arraysToDisable.push(this.findAirportId(form.controls['destinationLocation'].value).toString())
  //       }
  //       if (form.controls['changeLocation1'].value != '') {
  //         arraysToDisable.push(this.findAirportId(form.controls['changeLocation1'].value).toString())
  //       }
  //       if (form.controls['changeLocation2'].value != '') {
  //         arraysToDisable.push(this.findAirportId(form.controls['changeLocation2'].value).toString())
  //       }
  //       break;
  //
  //     case 'destinationLocation':
  //       if (form.controls['sourceLocation'].value != '') {
  //         arraysToDisable.push(this.findAirportId(form.controls['sourceLocation'].value).toString())
  //       }
  //       if (form.controls['changeLocation1'].value != '') {
  //         arraysToDisable.push(this.findAirportId(form.controls['changeLocation1'].value).toString())
  //       }
  //       if (form.controls['changeLocation2'].value != '') {
  //         arraysToDisable.push(this.findAirportId(form.controls['changeLocation2'].value).toString())
  //       }
  //       break;
  //
  //     case 'changeLocation1':
  //       if (form.controls['sourceLocation'].value != '') {
  //         arraysToDisable.push(this.findAirportId(form.controls['sourceLocation'].value).toString())
  //       }
  //       if (form.controls['destinationLocation'].value != '') {
  //         arraysToDisable.push(this.findAirportId(form.controls['destinationLocation'].value).toString())
  //       }
  //       if (form.controls['changeLocation2'].value != '') {
  //         arraysToDisable.push(this.findAirportId(form.controls['changeLocation2'].value).toString())
  //       }
  //       break;
  //
  //     case 'changeLocation2':
  //       if (form.controls['sourceLocation'].value != '') {
  //         arraysToDisable.push(this.findAirportId(form.controls['sourceLocation'].value).toString())
  //       }
  //       if (form.controls['destinationLocation'].value != '') {
  //         arraysToDisable.push(this.findAirportId(form.controls['destinationLocation'].value).toString())
  //       }
  //       if (form.controls['changeLocation1'].value != '') {
  //         arraysToDisable.push(this.findAirportId(form.controls['changeLocation1'].value).toString())
  //       }
  //       break;
  //   }
  //
  //   return arraysToDisable
  // }



  private findAirportId(airportDn: string): number {
    return this.airportService.getAirports().find((airport: Airport) => airport.city.toUpperCase().includes(airportDn.toUpperCase().split(',')[0])).id;
  }

}
