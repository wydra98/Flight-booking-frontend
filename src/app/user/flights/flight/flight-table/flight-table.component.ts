import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { MatTable } from '@angular/material/table';
import { FlightTableDataSource} from './flight-table-datasource';
import {IntermediateConnection} from "../../flight-view-data";

@Component({
  selector: 'app-flight-table',
  templateUrl: './flight-table.component.html',
  styleUrls: ['./flight-table.component.css']
})
export class FlightTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatTable) table: MatTable<IntermediateConnection>;
  @Input() changes: IntermediateConnection[];
  @Input() seatNumber: boolean;
  dataSource: FlightTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'departurePlace',"departureTime","arrivalPlace","arrivalTime","airline","price"];

  ngOnInit() {
    this.dataSource = new FlightTableDataSource(this.changes);
    if(this.seatNumber){
      this.displayedColumns.push("seatNumber");
    }
  }

  ngAfterViewInit() {
    this.table.dataSource = this.dataSource;
  }
}
