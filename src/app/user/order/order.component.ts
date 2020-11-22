import {Component, OnInit} from '@angular/core';
import {OrderFormBuilderService} from "./order-form-builder.service";
import {OrderingService} from "../../services/ordering.service";
import {FormArray} from "@angular/forms";
import {SnackBarComponent} from "../../snack-bar/snack-bar.component";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public passengersNumber: number;
  public passengerForm: FormArray;
  public maxDateForBirthDate: Date;

  constructor(
    private orderFormBuilder: OrderFormBuilderService,
    private orderService: OrderingService,
    private snackBar: SnackBarComponent) {
  }

  public ngOnInit(): void {
    this.passengersNumber = 1/*this.orderService.getPassengersNumber()*/;
    this.initializePassengersForm();
    this.maxDateForBirthDate = this.orderFormBuilder.getMaxDateForBirthDate();
  }

  private initializePassengersForm() {
    this.passengerForm = this.orderFormBuilder.createPassengerForm(this.passengersNumber);
  }

  public onSubmit(): void {
    const response = this.orderFormBuilder.checkIfPeselDuplicateExists(this.passengerForm);
    if (!response){
      this.orderService.onPassengerFormFilled(
        this.orderFormBuilder.mapFormArrayToPassengers(this.passengerForm)
      );
    }
    else{
      this.snackBar.showSnackbar('Numery PESEL muszą się różnić', 'fail')
    }
  }
}
