import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment/payment.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdersComponent } from './orders/orders.component';


const routes: Routes = [
  {
    path: '',
    component: PaymentComponent,
    pathMatch: 'full'
  },
  {
    path: 'orders',
    component:  OrdersComponent
  }

];

@NgModule({
  declarations: [PaymentComponent, OrdersComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: { showError: true }
  }]
})
export class PaymentModule { }
