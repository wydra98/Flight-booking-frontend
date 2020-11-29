import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DialogService} from '../../../services/dialog.service';
import {SnackBarComponent} from '../../../snack-bar/snack-bar.component';
import {Router} from '@angular/router';
import {AirlineService} from '../airline.service';

@Component({
  selector: 'app-airline-add',
  templateUrl: './airline-add.component.html',
  styleUrls: ['./airline-add.component.css']
})
export class AirlineAddComponent implements OnInit {

  public airlineForm: FormGroup;

  constructor(private airlineService: AirlineService,
              private dialogService: DialogService,
              private snackbar: SnackBarComponent,
              private router: Router) {
  }

  ngOnInit(): void {
    this.airlineForm = this.airlineService.createAirlineForm();
  }

  public onSubmit() {
    this.dialogService.openConfirmDialog('Czy na pewno chcesz dodać linię lotniczą?')
      .afterClosed().subscribe(res => {
      if (res) {
        this.airlineService.addAirline(this.airlineService.mapToAirline(this.airlineForm)).subscribe(
          () => {
            this.snackbar.showSnackbar('Pomyślnie dodano linię lotniczą', 'success');
            this.router.navigate(['airline']);
          },
          (err) => {
            this.snackbar.showSnackbar(err.error, 'fail');
          }
        );
      }
    });
  }

}
