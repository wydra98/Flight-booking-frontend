import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {AirlineTableDataSource} from './airline-table-datasource';
import {Airline} from "../../models/airline";
import {AuthorizationService} from "../../auth/authorization.service";
import {DialogService} from "../../services/dialog.service";
import {SnackBarComponent} from "../../snack-bar/snack-bar.component";
import {Router} from "@angular/router";
import {AirlineService} from "./airline.service";

@Component({
  selector: 'app-airline-table',
  templateUrl: './airline-table.component.html',
  styleUrls: ['./airline-table.component.css']
})
export class AirlineTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Airline>;
  dataSource: AirlineTableDataSource;
  airlines: Airline[];
  isDataFetched: boolean;


  constructor(private airlineService: AirlineService,
              private auth: AuthorizationService,
              private dialogService: DialogService,
              private snackbar: SnackBarComponent,
              private router: Router
  ) {
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'country', 'edit', 'delete'];

  ngOnInit() {
    this.airlineService.isLoading.next(0);
    this.fetchAirlines();
    this.airlineService.getLoading().subscribe(
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

  public fetchAirlines(): void {
    this.airlineService.fetchAirlines().subscribe(
      (airlines: Airline[]) => {
        this.airlines = airlines
        this.dataSource = new AirlineTableDataSource(this.airlines, this.dialogService, this.snackbar,
          this.airlineService, this.auth, this.router);

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      }
    )
  }

  navigateToAddPanel(){
    this.router.navigate(['/airlineAdd']);
  }

  navigateToEdit(row) {
    this.airlineService.navigateToEdit(row);
  }

  delete(row) {
    this.dataSource.delete(row);
  }
}
