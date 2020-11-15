import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import {TripToView} from "../../user/trip-table/trip-to-view";
import {TripTableDatasource} from "../../user/trip-table/trip-table-datasource";
import {Trip} from "../../models/trip";
import {TripService} from "../../user/trip-table/trip.service";
import {AuthorizationService} from "../../auth/authorization.service";
import {DialogService} from "../../services/dialog.service";
import {SnackBarComponent} from "../../snack-bar/snack-bar.component";
import {TripAdminTableDataSource} from "./trip-admin-table-datasource";

@Component({
  selector: 'app-trip-admin-table',
  templateUrl: './trip-admin-table.component.html',
  styleUrls: ['./trip-admin-table.component.css']
})
export class TripAdminTableComponent implements  OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<TripToView>;
  dataSource: TripAdminTableDataSource;
  trips: Trip[];
  tripsToView: TripToView[];
  todayDate = new Date();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  constructor(private tripService: TripService,
              private auth: AuthorizationService,
              private dialogService: DialogService,
              private snackbar: SnackBarComponent,
  ) {
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'departurePlace', 'departureTime', 'arrivalPlace',
    'arrivalTime', 'price', 'passengers', 'ticketsNumber', 'changes', 'details', 'delete'];

  ngOnInit() {
    this.fetchTrips();
  }

  public fetchTrips(): void {
    this.tripService.fetchTripsAll().subscribe(
      (trips: Trip[]) => {
        this.trips = trips
        this.tripsToView = this.tripService.toViewData(this.trips)
        this.dataSource = new TripAdminTableDataSource(this.tripsToView, this.dialogService, this.snackbar,
          this.tripService, this.auth);

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      }
    )
  }

  navigateToDetails(row) {
    this.tripService.getPassengers(row);
  }

  delete(row) {
    this.dataSource.delete(row);
  }
}
