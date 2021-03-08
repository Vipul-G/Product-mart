import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './service/auth.service';
import User from './types/user';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './ngrx/types';
import { loadProducts } from './ngrx/products/products.actions';
import { loadCart } from './ngrx/cart/cart.actions';
import { SharedService } from './service/shared.service';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';


@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  userState: User | {};
  cartLenght: number = 0

  subs: Subscription[] = [];
  isUserAuth = false;

  @ViewChild('snack') snackBar: SnackBarComponent

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>,
    private sharedService: SharedService
    ) {
      const userSub = store.select((state: AppState) => state).subscribe((state) => {
        this.userState = state.userState;
        this.cartLenght = 0
        state.cartState.cartProducts.forEach((cp) => {
          this.cartLenght += cp.quantity
        })
      })
      this.subs.push(userSub);
  }

  ngOnInit(){
    const sub = this.sharedService.snackbar$.subscribe((message) => {
      this.snackBar.openSnackBar(message)
    })
    this.subs.push(sub);
    this.authService.autoLogin()
    this.store.dispatch(loadProducts())
  }
  logout(){
      this.authService.logout();
      this.isUserAuth = false;
      this.router.navigate(['/']);
    }

    ngOnDestroy(){
      this.subs.forEach((sub) => sub.unsubscribe())
    }
}
