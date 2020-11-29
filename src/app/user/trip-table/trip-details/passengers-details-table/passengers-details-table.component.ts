import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {PassengersDetailsTableDataSource} from './passengers-details-table-datasource';
import {Passenger} from '../../../../models/passenger';

@Component({
  selector: 'app-passengers-details-table',
  templateUrl: './passengers-details-table.component.html',
  styleUrls: ['./passengers-details-table.component.css']
})
export class PassengersDetailsTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatTable) table: MatTable<Passenger>;
  @Input() passengers: Passenger[];
  dataSource: PassengersDetailsTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'firstName', 'surname', 'documentId', 'phoneNumber', 'pesel', 'email'];

  ngOnInit() {
    this.dataSource = new PassengersDetailsTableDataSource(this.passengers);
  }

  ngAfterViewInit() {
    this.table.dataSource = this.dataSource;
  }
}
