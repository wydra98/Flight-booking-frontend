import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {TripTableDatasource} from './trip-table-datasource';
import {TripService} from "./trip.service";
import {AuthorizationService} from "../../auth/authorization.service";
import {Trip} from "../../models/trip";
import {TripToView} from "./trip-to-view";
import {DialogService} from "../../services/dialog.service";
import {BehaviorSubject, Observable} from "rxjs";
import {SnackBarComponent} from "../../snack-bar/snack-bar.component";

@Component({
  selector: 'app-ticket-table',
  templateUrl: './trip-table.component.html',
  styleUrls: ['./trip-table.component.css']
})
export class TripTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<TripToView>;
  dataSource: TripTableDatasource;
  trips: Trip[];
  tripsToView: TripToView[];

  constructor(private tripService: TripService,
              private auth: AuthorizationService,
              private dialogService: DialogService,
              private snackbar: SnackBarComponent,
              private cd: ChangeDetectorRef) {
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'departurePlace', 'departureTime', 'arrivalPlace',
                      'arrivalTime', 'price', 'passengers','ticketsNumber','changes', 'details', 'delete'];

  ngOnInit() {
    this.fetchTrips();
  }

  public fetchTrips(): void {
    this.tripService.fetchTrips(parseInt(this.auth.getId())).subscribe(
      (trips: Trip[]) => {
        this.trips = trips
        this.tripsToView = this.tripService.toViewData(this.trips)
        this.dataSource = new TripTableDatasource(this.tripsToView, this.dialogService, this.snackbar,
          this.tripService, this.auth, this.cd);

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      }
    )
  }

  navigateToDetails(row){
    console.log(row)
  }

  delete(row) {
    this.dataSource.delete(row);
  }
}
