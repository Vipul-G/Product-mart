import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { CartService } from 'src/app/service/cart.service';
import * as actions from './cart.actions'
import Product from '../../types/product'
import { of } from 'rxjs';
import { Cart, CartProduct } from './cart';

@Injectable()
export class CartEffects {

  constructor(
    private actions$: Actions,
    private cartService: CartService
  ) {}

  loadCart$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadCart),
    switchMap((action) => this.cartService.loadCart()
    .pipe(
      map((cartProducts: CartProduct[]) => actions.loadCartSuccess({ cartProducts })),
      catchError((error) => of(actions.loadCartFailure({ error: error.message })))
    )
    )
  ))

  addProduct$ = createEffect(() => this.actions$.pipe(
    ofType(actions.addProduct),
    mergeMap((action) => this.cartService.addProduct(action.product)
      .pipe(
        map(() => actions.addProductSuccess({ product: action.product })),
        catchError((error) => of(actions.addProductFailure({ error: error.message })))
      )
    )
  ))

  updateCount$ = createEffect(() => this.actions$.pipe(
    ofType(actions.updateCount),
    exhaustMap((action) => this.cartService.updateCount(action.product_id, action.count)
      .pipe(
        map(() => actions.updateCountSuccess({product_id: action.product_id, count: action.count})),
        catchError((error) => of(actions.updateCountFailure({ error: error.message })))
      )
    )
  ))

  removeProduct$ = createEffect(() => this.actions$.pipe(
    ofType(actions.removeProduct),
    concatMap((action) => this.cartService.removeProduct(action.product_id)
      .pipe(
        map(() => actions.removeProductSuccess({product_id: action.product_id})),
        catchError((error) => of(actions.removeProductFailure({ error: error.message })))
      )
    )
  ))

}
