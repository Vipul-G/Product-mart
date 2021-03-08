import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { share, shareReplay } from 'rxjs/operators';
import { AppState } from 'src/app/ngrx/types';
import { AuthService } from 'src/app/service/auth.service';
import { PaymentService } from 'src/app/service/payment.service';
import { Payment } from 'src/app/types/payment';
import User from 'src/app/types/user';
import { Router } from '@angular/router';

const paymentObj = {
  card: 'CARD',
  cod: 'Cash On Delivery'
}

@Component({
  selector: 'pm-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy {

  paymentOptions = ['card', 'cod']
  displayedColumns = ['name', 'quantity', 'price']
  userState$: Observable<User>
  placeOrderFlag = false
  private sub: Subscription

  @ViewChild('stepper') stepper

  constructor(
    private paymentService: PaymentService,
    private _formBuilder: FormBuilder,
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router
    ) {}
  firstFormGroup: FormGroup;

  ngOnInit() {
    this.userState$ = this.store.select((state) => state.userState).pipe(shareReplay())
    this.firstFormGroup = this._formBuilder.group({
      paymentType: ['', Validators.required],
      cardNo: ['']
    });

    this.sub = this.firstFormGroup.get('paymentType').valueChanges.subscribe((v) => {
     this.changeValidators(v)
    })
  }

  paymentEvaluator(type = null) {
    return type ? paymentObj[type] : paymentObj[this.paymentInfo.paymentType]
  }

  pay() {
    if (this.total == 0) {
      return
    }
    const payType = this.paymentInfo.paymentType
    const payment: Payment = {
      user_id: this.authService.user.id,
      amount: this.total,
      payment_mode: payType.toUpperCase(),
      payment_status: payType == 'card' ? true: false
    }
    this.paymentService.addPayment(payment).subscribe(() => {
      this.stepper.reset()
      this.router.navigate(['/payment/orders'], { queryParams: {user_id: this.authService.user.id}})
    })

  }

  placeOrder() {

  }

  get paymentInfo() {
    return this.firstFormGroup.value
  }

  private changeValidators(v) {
    if(v.toLowerCase() ==='card') {
      this.firstFormGroup.get('cardNo').setValidators([Validators.required])
      this.firstFormGroup.get('cardNo').updateValueAndValidity()
    } else {
      this.firstFormGroup.get('cardNo').clearValidators()
      this.firstFormGroup.get('cardNo').updateValueAndValidity()
    }
  }
  get orders() {
    return this.paymentService.orders
  }

  get total() {
    return this.paymentService.total
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}
