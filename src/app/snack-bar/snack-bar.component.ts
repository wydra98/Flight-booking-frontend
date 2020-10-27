import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatSnackBar,MatSnackBarModule} from "@angular/material/snack-bar";

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css'],
  encapsulation: ViewEncapsulation.None  // Set ViewEncapsulation.None for encapsulation property
})
export class SnackBarComponent {

  constructor(private snackBar: MatSnackBar) { }

  showSnackbar(message: string, result: string) {

    if (result == 'success') {
      this.snackBar.open(message, 'Close', {
          duration: 4000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass:"style-succes"}
      )
    } else {
      this.snackBar.open(message, 'Close', {
        duration: 4000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass:"style-error"
      })
    }
  }
}

