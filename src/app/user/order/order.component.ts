import {Component, OnInit} from '@angular/core';
import {OrderFormBuilderService} from "./order-form-builder.service";
import {OrderingService} from "../../services/ordering.service";
import {FormArray} from "@angular/forms";

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
    private orderService: OrderingService) {
  }

  public ngOnInit(): void {
    this.passengersNumber = 2/*this.orderService.getPassengersNumber()*/;
    this.initializePassengersForm();
    this.maxDateForBirthDate = this.orderFormBuilder.getMaxDateForBirthDate();
  }

  private initializePassengersForm() {
    this.passengerForm = this.orderFormBuilder.createPassengerForm(this.passengersNumber);
  }

  public onSubmit(): void {
    this.orderService.onPassengerFormFilled(
      this.orderFormBuilder.mapFormArrayToPassengers(this.passengerForm)
    );
  }
}
