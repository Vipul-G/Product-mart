import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { loadCart } from '../ngrx/cart/cart.actions';
import { AppState } from '../ngrx/types';
import Product from '../types/product'

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnDestroy {

  private readonly apiUrl = 'http://localhost:3000/api/v1/cart'
  private user_id: number = null
  private sub: Subscription

  constructor(private http: HttpClient, private store: Store<AppState>) {
    const userSub = this.store.select((state: AppState) => state.userState).subscribe((userState) => {
      this.user_id = userState.id;
      this.store.dispatch(loadCart())
    })
    this.sub = userSub;
  }

  loadCart() {
    return this.http.get(`${this.apiUrl}/${this.user_id}/-1`)
    .pipe(tap(res => {}))
  }

  addProduct(product: Product) {
    if (!this.user_id || !product.id) {
      return throwError(new Error('No userid or productid'))
    }
    return this.http.post(this.apiUrl, {
      user_id: this.user_id, product_id: product.id, quantity: 1})
  }

  updateCount(product_id, count) {
    if (!this.user_id || !product_id) {
      return throwError(new Error('No userid or productid'))
    }
    return this.http.put(`${this.apiUrl}/count/${this.user_id}/${product_id}`,
    { count })
  }

  removeProduct(product_id) {
    if (!this.user_id || !product_id) {
      return throwError(new Error('No userid or productid'))
    }
    return this.http.delete(`${this.apiUrl}/${this.user_id}/${product_id}`)
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
