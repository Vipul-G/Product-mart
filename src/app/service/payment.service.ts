import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartProduct } from '../ngrx/cart/cart';
import Order from '../types/order';
import { Payment } from '../types/payment';
import Product from '../types/product'
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly apiUrl = 'http://localhost:3000/api/v1'

  constructor(private http: HttpClient) { }

  private orderList: CartProduct[] = [] // uncomfirmed orders
  private totalAmount: number = 0

  get orders() {
    return [...this.orderList]
  }
  set orders(orderList: CartProduct[]) {
    this.orderList = [...orderList]
  }

  get total() {
    return this.totalAmount
  } set total(amount: number) {
    this.totalAmount = amount
  }

  addPayment(payment: Payment) {
    const products = this.orderList.map((o) => ({
      product_id: o.product.id,
      quantity: o.quantity
    }))
    const order = { ...payment, products }
    return this.http.post(this.apiUrl + '/payment',order)
  }

  getOrders(user_id): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl + '/order/' + user_id)
  }


}
