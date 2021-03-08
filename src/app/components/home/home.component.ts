import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { addProduct } from 'src/app/ngrx/cart/cart.actions';
import {AppState, ProductState} from '../../ngrx/types'

@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  $productState: Observable<ProductState> = this.store.select((state) => {
    return state.productState
  })

  constructor(private store: Store<AppState>) {
    this.$productState.pipe(share())
  }


  getImageUrl({image_path}) {
    return `url(http://localhost:3000/image/${image_path})`
  }

  addToCart(product) {
    this.store.dispatch(addProduct({product}))
  }

}
