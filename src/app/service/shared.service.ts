import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private snackbar = new Subject<string>();

  get snackbar$() { return this.snackbar.asObservable() }

  showSnackBar(message: string) {
    this.snackbar.next(message)
  }

  constructor() { }
}
