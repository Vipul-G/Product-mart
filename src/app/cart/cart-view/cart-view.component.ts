import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { removeProduct, updateCount } from 'src/app/ngrx/cart/cart.actions';
import { AppState, CartState } from 'src/app/ngrx/types';
import { PaymentService } from 'src/app/service/payment.service';


@Component({
  selector: 'pm-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss']
})
export class CartViewComponent implements OnInit, OnDestroy {

  cartState: CartState
  private sub: Subscription

  private readonly imageUrl = 'http://localhost:3000/image/'

  constructor(
    private store: Store<AppState>,
    private ref: ChangeDetectorRef,
    private paymentService: PaymentService,
    private router: Router
    ) {

  }

  ngOnInit() {
    this.sub = this.store.select((state: AppState) => state.cartState)
   .subscribe((cartState) => {
     this.cartState = cartState
     this.ref.detectChanges()
   })
  }

  displayedColumns: string[] = ['image', 'info', 'other', 'action'];

  getImageUrl({image_path}) {
    return this.imageUrl + image_path
  }

  get total() {
    return this.cartState.cartProducts.reduce((prevValue, currValue) => prevValue + (currValue.product.price * currValue.quantity), 0)
  }

  updateCount(product_id, count) {
    this.store.dispatch(updateCount({product_id, count}))
  }

  removeProduct(product_id) {
    this.store.dispatch(removeProduct({product_id}))
  }

  proceedToBuy() {
    this.paymentService.orders = this.cartState.cartProducts
    this.paymentService.total = this.total
    this.router.navigate(['../payment'])
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

}
