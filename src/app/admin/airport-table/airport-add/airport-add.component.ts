import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AirportService} from "../airport.service";
import {DialogService} from "../../../services/dialog.service";
import {SnackBarComponent} from "../../../snack-bar/snack-bar.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-airport-add',
  templateUrl: './airport-add.component.html',
  styleUrls: ['./airport-add.component.css']
})
export class AirportAddComponent implements OnInit {

  public airportForm: FormGroup;

  constructor(private airportService: AirportService,
              private dialogService: DialogService,
              private snackbar: SnackBarComponent,
              private router: Router) {
  }

  ngOnInit(): void {
    this.airportForm = this.airportService.createAirportForm();
  }

  public onSubmit() {
    this.dialogService.openConfirmDialog('Czy na pewno chcesz dodać lotnisko?')
      .afterClosed().subscribe(res => {
      if (res) {
        this.airportService.addAirport(this.airportService.mapToAirport(this.airportForm)).subscribe(
          () => {
            this.snackbar.showSnackbar("Pomyślnie dodano lotnisko", 'success')
            this.router.navigate(['airport']);
          },
          (err) => {
            this.snackbar.showSnackbar(err.error, 'fail');
          }
        )
      }
    })
  }
}
