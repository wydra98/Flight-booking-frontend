import {  Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AirportTableDataSource } from './airport-table-datasource';
import {Airport} from "../../models/airport";
import {AuthorizationService} from "../../auth/authorization.service";
import {DialogService} from "../../services/dialog.service";
import {SnackBarComponent} from "../../snack-bar/snack-bar.component";
import {AirportService} from "./airport.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-airport-table',
  templateUrl: './airport-table.component.html',
  styleUrls: ['./airport-table.component.css']
})
export class AirportTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Airport>;
  dataSource: AirportTableDataSource;
  airports: Airport[];
  isDataFetched: boolean;

  constructor(private airportService: AirportService,
              private auth: AuthorizationService,
              private dialogService: DialogService,
              private snackbar: SnackBarComponent,
              private router: Router
  ) {
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'country', 'timezone' ,'longitude', 'latitude','edit','delete'];

  ngOnInit() {
    this.airportService.isLoading.next(0);
    this.fetchAirports();
    this.airportService.getLoading().subscribe(
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

  public fetchAirports(): void {
    this.airportService.fetchAirports().subscribe(
      (airports: Airport[]) => {
        this.airports = airports
        this.dataSource = new AirportTableDataSource(this.airports, this.dialogService, this.snackbar,
          this.airportService, this.auth, this.router);

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      }
    )
  }

  navigateToAddPanel(){
    this.router.navigate(['/airportAdd']);
  }

  navigateToEdit(row) {
    this.airportService.navigateToEdit(row);
  }

  delete(row) {
    this.dataSource.delete(row);
  }

}
