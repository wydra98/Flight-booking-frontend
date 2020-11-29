import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AirportService} from '../airport.service';
import {DialogService} from '../../../services/dialog.service';
import {SnackBarComponent} from '../../../snack-bar/snack-bar.component';
import {Router} from '@angular/router';
import {Airport} from '../../../models/airport';

@Component({
  selector: 'app-airport-edit',
  templateUrl: './airport-edit.component.html',
  styleUrls: ['./airport-edit.component.css']
})
export class AirportEditComponent implements OnInit {

  public airportForm: FormGroup;
  chosenAirport: Airport;

  constructor(private airportService: AirportService,
              private dialogService: DialogService,
              private snackbar: SnackBarComponent,
              private router: Router) {
  }

  ngOnInit(): void {
    this.fetchAirport();
    this.airportForm = this.airportService.createAirportForm();
  }

  private fetchAirport() {
    this.airportService.getChosenAirport().subscribe(
      (airport: Airport) => {
        this.chosenAirport = airport;
      }
    );
    this.airportForm = this.airportService.createAirportForm();
  }

  public onSubmit() {
    this.dialogService.openConfirmDialog('Czy na pewno chcesz zmodyfikować lotnisko?')
      .afterClosed().subscribe(res => {
      if (res) {
        this.airportService.editAirport(this.airportService.mapToAirportWithId(this.airportForm, this.chosenAirport.id)).subscribe(
          () => {
            this.snackbar.showSnackbar('Pomyślnie zmodyfikowano lotnisko', 'success');
            this.router.navigate(['airport']);
          },
          (err) => {
            this.snackbar.showSnackbar(err.error, 'fail');
          }
        );
      }
    });
  }
}
