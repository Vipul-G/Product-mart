import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { share } from 'rxjs/operators';
import { PaymentService } from 'src/app/service/payment.service';
import Order from 'src/app/types/order';

@Component({
  selector: 'pm-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private orderService: PaymentService) { }

  private sub: Subscription;

  orders$: Observable<Order[]>
  // order_id: number;
  // payment_id: number;
  // order_time: string;
  // estimate_delivery: string;
  // amount: number;
  // payment_mode: string;
  // payment_status: boolean;
  displayedColumns: string[] = ['Order Id', 'Payment Id', 'Order Time', 'Estimate Delivery', 'Amount', 'Payment Mode', 'Payment Status'];


  ngOnInit(): void {
    this.sub = this.route.queryParamMap.subscribe((params) => {
      const user_id = params.get('user_id')
      if(user_id) {
        this.orders$ = this.orderService.getOrders(user_id).pipe(share())
      }
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

}
