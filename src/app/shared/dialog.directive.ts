import { Directive, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Directive({
  selector: '[pmDialog]'
})
export class DialogDirective {

  constructor(public dialog: MatDialog) { }

  @Input() dialogTemplate

  @HostListener('click') openDialog() {
    console.log(this.dialogTemplate)
    const dialogRef = this.dialog.open(this.dialogTemplate);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
