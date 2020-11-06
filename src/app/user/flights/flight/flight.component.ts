import { TripViewDataService } from '../../../services/flight-view-data.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Trip } from 'src/app/models/trip';
import {FlightViewData} from "./flight-view-data";

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {
  @Input() flight: Trip;
  @Output() chosenFlight = new EventEmitter<Trip>();
  public sourcePlace: string;
  public destinationPlace: string;
  public viewData: FlightViewData;

  constructor(private flightViewDataService: TripViewDataService) { }

  public ngOnInit(): void {
    this.initializeViewData();
  }

  public onFlightSelection(): void {
    this.chosenFlight.next(this.flight);
  }

  private initializeViewData(): void {
    this.viewData = this.flightViewDataService.toViewData(this.flight);
  }
}
