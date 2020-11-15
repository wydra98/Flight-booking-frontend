import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { PassengerTableDataSource } from './passenger-table-datasource';
import {Passenger} from "../../models/passenger";
import {AuthorizationService} from "../../auth/authorization.service";
import {DialogService} from "../../services/dialog.service";
import {SnackBarComponent} from "../../snack-bar/snack-bar.component";
import {Router} from "@angular/router";
import {PassengerService} from "./passenger.service";

@Component({
  selector: 'app-passenger-table',
  templateUrl: './passenger-table.component.html',
  styleUrls: ['./passenger-table.component.css']
})
export class PassengerTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Passenger>;
  dataSource: PassengerTableDataSource;
  passengers: Passenger[];
  isDataFetched: boolean;


  constructor(private passengerService: PassengerService,
              private auth: AuthorizationService,
              private dialogService: DialogService,
              private snackbar: SnackBarComponent,
              private router: Router
  ) {
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'firstName', 'surname','dateOfBirth','phoneNumber','email','pesel','delete'];

  ngOnInit() {
    this.passengerService.isLoading.next(0);
    this.fetchPassengers();
    this.passengerService.getLoading().subscribe(
      (number) => {
        switch  (number){
          case 0:
            this.isDataFetched = true;
            break;
          case 1:
            this.isDataFetched = false;
            break;
          case 2:
            this.ngOnInit()
            break;
        }
      }
    )
  }

  public fetchPassengers(): void {
    this.passengerService.fetchPassengers().subscribe(
      (passengers: Passenger[]) => {
        this.passengers = passengers
        this.dataSource = new PassengerTableDataSource(this.passengers, this.dialogService, this.snackbar,
          this.passengerService, this.auth, this.router);

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      }
    )
  }

  delete(row) {
    this.dataSource.delete(row);
  }
}
