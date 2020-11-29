import {TripViewDataService} from '../flight-view-data.service';
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Trip} from 'src/app/models/trip';
import {FlightViewData} from '../flight-view-data';
import {SearchFlightService} from '../../../services/search-flight.service';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {
  @Input() flight: Trip;
  @Output() chosenFlight = new EventEmitter<Trip>();
  public sourcePlace: string;
  public viewData: FlightViewData;
  public passengerNumber = this.searchFlightService.getPassengersNumber();

  constructor(private flightViewDataService: TripViewDataService, private searchFlightService: SearchFlightService) {
  }

  public ngOnInit(): void {
    this.initializeViewData();
  }

  public onFlightSelection(): void {
    let tmp = this.viewData.sourcePlace
    this.viewData.sourcePlace = this.viewData.destinationPlace
    this.viewData.destinationPlace = tmp;
    this.chosenFlight.next(this.flight);
  }

  private initializeViewData(): void {
    this.viewData = this.flightViewDataService.toViewData(this.flight);
  }
}
