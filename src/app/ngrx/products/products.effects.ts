import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { ProductService } from 'src/app/service/product.service';
import * as actions from './products.actions'
import Product from '../../types/product'
import { SharedService } from 'src/app/service/shared.service';

@Injectable()
export class ProductEffects {

  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private sharedService: SharedService
  ) {}

  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadProducts),
    mergeMap(() => this.productService.getAll()
      .pipe(
        map(products => actions.loadProductsSuccess({ products })),
        catchError((error) => of(actions.loadProductsFailure({ error: error.message }))
      ))
    )
  ))

  addProduct$ = createEffect(() => this.actions$.pipe(
    ofType(actions.addProduct),
    mergeMap((action) => this.productService.addProduct(action.product)
      .pipe(
        map((product: Product) => {
          this.sharedService.showSnackBar('Product added successfully')
          return actions.addProductSuccess({ product })
        }),
        catchError((error) => {
          this.sharedService.showSnackBar('Product addition failed')
          return of(actions.addProductFailure({ error: error.message }))
        })
      )
    )
  ))

  updateProduct$ = createEffect(() => this.actions$.pipe(
    ofType(actions.updateProduct),
    mergeMap((action) => this.productService.updateProduct(action.product)
    .pipe(
      map((product: Product) => {
        this.sharedService.showSnackBar('Product updated successfully')
        return actions.updateProductSuccess({ product })
    }),
      catchError((error) => {
        this.sharedService.showSnackBar('Product updation failed')
        return of(actions.updateProductFailure({ error: error.message }))
      })
    ))
  ))

  deleteProduct$ = createEffect(() => this.actions$.pipe(
    ofType(actions.deleteProduct),
    mergeMap((action) => this.productService.deleteProduct(action.id, action.imagePath)
    .pipe(
      map(() => {
        this.sharedService.showSnackBar('Product deleted successfully')
        return actions.deleteProductSuccess({ id: action.id })
    }),
      catchError((error) => {
        this.sharedService.showSnackBar('Product deletion failed')
        return of(actions.deleteProductFailure({ error: error.message }))
      })
    )
  )))


}
