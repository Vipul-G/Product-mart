import { Component, Input, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'pm-snack-bar',
  templateUrl: './snack-bar.component.html'
})
export class SnackBarComponent {

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string = '', action: string = 'Undo') {
    if (message === '') { return }
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
