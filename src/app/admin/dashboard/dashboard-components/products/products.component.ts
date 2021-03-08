import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import {ProductState} from '../../../../ngrx/types'
import {AppState} from '../../../../ngrx/types'
import { Store } from '@ngrx/store';
import * as actions from '../../../../ngrx/products/products.actions'
import { share } from 'rxjs/operators';
import { MatTab, MatTabLabel, MatTabLink } from '@angular/material/tabs';
import { ProductService } from 'src/app/service/product.service';
import { addProduct } from '../../../../ngrx/products/products.actions';

@Component({
  selector: 'pm-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  $productState: Observable<ProductState> = this.store.select((state) => {
    return state.productState
  })

  constructor(
    private store: Store<AppState>) { this.$productState.subscribe() }

  ngOnInit() {
    // this.store.dispatch(actions.loadProducts())
    this.$productState.pipe(share())
  }

  handleSubmit(productObj) {
    let sub;
    if(productObj.mode === 'add') {
      sub = this.store.dispatch(addProduct({ product: productObj.product }))
    }
    this.subscriptions.push(sub)
  }

  ngOnDestroy() {
    //this.subscriptions.forEach((sub) => sub.unsubscribe())
  }

}
